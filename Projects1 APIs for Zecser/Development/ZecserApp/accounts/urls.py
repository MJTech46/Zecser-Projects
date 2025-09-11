from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import SignupView, VerifyOTPView, ResendOTPView

urlpatterns = [
    path("api/signup/", SignupView.as_view(), name="signup"),
    path("api/login/", TokenObtainPairView.as_view(), name="login"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/verify-otp/", VerifyOTPView.as_view(), name="verify-otp"),
    path("api/resend-otp/", ResendOTPView.as_view(), name="resend-otp"),
]
