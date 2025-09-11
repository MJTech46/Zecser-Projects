from django.core.mail import send_mail
import random
from decouple import config

def generate_otp():
    return str(random.randint(100000, 999999))


def send_otp(email, otp):
    send_mail(
        "Your Zecser Verification Code",
        f"Your OTP is {otp}. It will expire in 30 seconds.",
        config("EMAIL_HOST_USER"),
        [email],
    )
    return otp

def resend_otp(email, otp):
    send_mail(
        "Your Zecser New Verification Code",
        f"Your OTP is {otp}. It will expire in 30 seconds.",
        config("EMAIL_HOST_USER"),
        [email],
    )
    return otp