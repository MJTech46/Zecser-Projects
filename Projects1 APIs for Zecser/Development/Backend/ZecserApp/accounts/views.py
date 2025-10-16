from rest_framework import permissions
from .models import User, PendingUser, PasswordResetOTP
from .serializers import UserSignupSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from .utils import generate_otp, send_otp, resend_otp, send_password_reset_otp
from django.contrib.auth.hashers import make_password
from django.utils import timezone
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import EmailTokenObtainPairSerializer



class SignupView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = UserSignupSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data["email"]

            if User.objects.filter(email=email).exists():
                return Response({"error": "Email already registered"}, status=400)

            otp = generate_otp()
            send_otp(email, otp)

            # bypassing opt for now
            User.objects.create(
                email=email,
                username=serializer.validated_data["username"],
                password=make_password(serializer.validated_data["password"]),
                first_name=serializer.validated_data.get("first_name", ""),
                last_name=serializer.validated_data.get("last_name", ""),
                role=serializer.validated_data.get("role", "jobseeker"),
            )

            return Response({"message": "OTP sent to email. Please verify."}, status=200)

        return Response(serializer.errors, status=400)


class VerifyOTPView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get("email")
        otp = request.data.get("otp")

        try:
            pending = PendingUser.objects.get(email=email)
        except PendingUser.DoesNotExist:
            return Response({"error": "No pending account found"}, status=400)

        # Check expiry
        if not pending.is_otp_valid():
            return Response({"error": "OTP expired, please request a new one."}, status=400)

        # Check OTP match
        if pending.otp != otp:
            return Response({"error": "Invalid OTP"}, status=400)

        # Create actual user
        user = User.objects.create(
            username=pending.username,
            email=pending.email,
            first_name=pending.first_name,
            last_name=pending.last_name,
            password=pending.password,
            role=pending.role,
        )

        pending.delete()
        return Response({"message": "Account verified & created"}, status=201)


class ResendOTPView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get("email")

        try:
            pending = PendingUser.objects.get(email=email)
        except PendingUser.DoesNotExist:
            return Response({"error": "No pending account found"}, status=400)

        # Generate new OTP
        otp = generate_otp()
        pending.otp = otp
        pending.otp_created_at = timezone.now()
        pending.save()

        resend_otp(email, otp)

        return Response({"message": "New OTP sent to your email."}, status=200)

class EmailLoginView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer


class ResetPasswordView(APIView):
    permission_classes = [permissions.IsAuthenticated]  # JWT required

    def post(self, request):
        user = request.user
        old_password = request.data.get("oldPassword")
        new_password = request.data.get("newPassword")
        confirm_password = request.data.get("confirmPassword")

        # Validate required fields
        if not old_password:
            return Response({"error": "oldPassword is required"}, status=400)

        if not new_password or not confirm_password:
            return Response({"error": "Both newPassword and confirmPassword are required"}, status=400)

        # Check confirm password
        if confirm_password != new_password:
            return Response({"error": "confirmPassword and newPassword are not the same"}, status=400)

        # Check old password
        if not user.check_password(old_password):
            return Response({"error": "Old password is incorrect"}, status=400)

        # Update password
        user.set_password(new_password)
        user.save()

        return Response({"message": "Password updated successfully"}, status=200)


class ForgotPasswordRequestView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get("email")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"error": "No account found with this email"}, status=400)

        otp = generate_otp()
        PasswordResetOTP.objects.create(user=user, otp=otp)
        send_password_reset_otp(email, otp)
        
        return Response({"message": "OTP sent to your email"}, status=200)


class ForgotPasswordOTPVerifyView(APIView):
    def post(self, request):
        email = request.data.get("email")
        otp = request.data.get("otp")

        try:
            user = User.objects.get(email=email)
            reset_record = PasswordResetOTP.objects.filter(user=user, otp=otp).latest("created_at")
        except (User.DoesNotExist, PasswordResetOTP.DoesNotExist):
            return Response({"error": "Invalid email or OTP"}, status=400)

        if not reset_record.is_valid():
            return Response({"error": "OTP expired"}, status=400)

        reset_record.verified = True
        reset_record.save()

        return Response({"message": "OTP verified successfully. You can now reset your password."}, status=200)


class ForgotPasswordResetView(APIView):
    def post(self, request):
        email = request.data.get("email")
        new_password = request.data.get("newPassword")
        confirm_password = request.data.get("confirmPassword")

        if new_password != confirm_password:
            return Response({"error": "Passwords do not match"}, status=400)

        try:
            user = User.objects.get(email=email)
            reset_record = PasswordResetOTP.objects.filter(user=user, verified=True).latest("created_at")
        except (User.DoesNotExist, PasswordResetOTP.DoesNotExist):
            return Response({"error": "No verified OTP found"}, status=400)

        # Extra check: OTP still within 10 mins
        if not reset_record.is_valid():
            return Response({"error": "OTP expired"}, status=400)

        user.set_password(new_password)
        user.save()

        # Cleanup
        reset_record.delete()

        return Response({"message": "Password reset successfully"}, status=200)

