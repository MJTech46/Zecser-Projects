from rest_framework import generics, permissions
from .models import User
from .serializers import UserSignupSerializer
from rest_framework.response import Response
from rest_framework.views import APIView

class SignupView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSignupSerializer
    permission_classes = [permissions.AllowAny]

class ProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "role": user.role,
        })

    def put(self, request):
        user = request.user
        role = request.data.get("role")
        if role in ["jobseeker", "employer"]:
            user.role = role
            user.save()
        return Response({"message": "Profile updated", "role": user.role})
