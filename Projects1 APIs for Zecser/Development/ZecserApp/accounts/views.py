from rest_framework import permissions
from .models import User, PendingUser
from .serializers import UserSignupSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from .utils import generate_otp, send_otp, resend_otp
from django.contrib.auth.hashers import make_password
from django.utils import timezone



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

            PendingUser.objects.create(
                email=email,
                username=serializer.validated_data["username"],
                password=make_password(serializer.validated_data["password"]),
                role=serializer.validated_data.get("role", "jobseeker"),
                otp=otp
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

