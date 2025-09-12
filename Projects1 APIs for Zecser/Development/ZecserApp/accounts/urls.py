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
    path("api/signup/", SignupView.as_view(), name="signup"),
    path("api/signup/verify-otp/", VerifyOTPView.as_view(), name="verify-otp"),
    path("api/signup/resend-otp/", ResendOTPView.as_view(), name="resend-otp"),

    path("api/login/", EmailLoginView.as_view(), name="login"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    path("api/reset-password/", ResetPasswordView.as_view(), name="reset-password"),
    path("api/forgot-password/request-otp/", ForgotPasswordRequestView.as_view(), name="forgot-password-request-otp"),
    path("api/forgot-password/verify-otp/", ForgotPasswordOTPVerifyView.as_view(), name="forgot-password-verify-otp"),
    path("api/forgot-password/reset/", ForgotPasswordResetView.as_view(), name="forgot-password-reset"),
]
