from django.contrib.auth.models import AbstractUser
from django.db import models
from datetime import timedelta
from django.utils import timezone

# Choices for user role
class UserRoles(models.TextChoices):
    JOB_SEEKER = "jobseeker", "Job Seeker"
    EMPLOYER = "employer", "Employer"
    COMPANY = "company", "Company"

class User(AbstractUser):
    """ "email, username, password, first_name, last_name" are inherited from AbstractUser """
    role = models.CharField(
        max_length=20,
        choices=UserRoles.choices,
        default=UserRoles.JOB_SEEKER
    )

    def __str__(self):
        return f"{self.username} ({self.role})"


class PendingUser(models.Model):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150)
    password = models.CharField(max_length=255)  # store hashed
    first_name = models.CharField(("first name"), max_length=150, blank=True)
    last_name = models.CharField(("last name"), max_length=150, blank=True)
    role = models.CharField(max_length=20, default="jobseeker")
    otp = models.CharField(max_length=6)
    otp_created_at = models.DateTimeField(auto_now_add=True) 
    created_at = models.DateTimeField(auto_now_add=True)

    def is_otp_valid(self):
        expiry_time = self.otp_created_at + timedelta(minutes=10)
        return timezone.now() <= expiry_time

class PasswordResetOTP(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    verified = models.BooleanField(default=False)

    def is_valid(self):
        expiry_time = self.created_at + timedelta(minutes=10)
        return timezone.now() <= expiry_time