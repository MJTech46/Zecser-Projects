from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from .views import (
    SignupView,
    VerifyOTPView,
    ResendOTPView,
    ResetPasswordView,
    EmailLoginView,
    ForgotPasswordRequestView,
    ForgotPasswordOTPVerifyView,
    ForgotPasswordResetView,
)

urlpatterns = [
    path("signup/", SignupView.as_view(), name="signup"),
    path("signup/verify-otp/", VerifyOTPView.as_view(), name="verify-otp"),
    path("signup/resend-otp/", ResendOTPView.as_view(), name="resend-otp"),

    path("login/", EmailLoginView.as_view(), name="login"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    path("reset-password/", ResetPasswordView.as_view(), name="reset-password"),
    path("forgot-password/request-otp/", ForgotPasswordRequestView.as_view(), name="forgot-password-request-otp"),
    path("forgot-password/verify-otp/", ForgotPasswordOTPVerifyView.as_view(), name="forgot-password-verify-otp"),
    path("forgot-password/reset/", ForgotPasswordResetView.as_view(), name="forgot-password-reset"),
]
