from django.contrib.auth.models import AbstractUser
from django.db import models
from datetime import timedelta
from django.utils import timezone

# Choices for user role
class UserRoles(models.TextChoices):
    JOB_SEEKER = "jobseeker", "Job Seeker"
    EMPLOYER = "employer", "Employer"

class User(AbstractUser):
    # Extra fields beyond Django's default (username, email, password, etc.)
    role = models.CharField(
        max_length=20,
        choices=UserRoles.choices,
        default=UserRoles.JOB_SEEKER
    )
    phone = models.CharField(max_length=15, blank=True, null=True)
    profile_picture = models.ImageField(upload_to="profile_pics/", blank=True, null=True)
    cover_picture = models.ImageField(upload_to="cover_picture/", blank=True, null=True)
    bio = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.username} ({self.role})"


# Job Seeker Profile (extra details)
class JobSeekerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="jobseeker_profile")
    skills = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"Job Seeker Profile: {self.user.username}"


# Employer Profile (extra details)
class EmployerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="employer_profile")
    company_name = models.CharField(max_length=255)
    company_website = models.URLField(blank=True, null=True)
    company_description = models.TextField(blank=True, null=True)
    company_logo = models.ImageField(upload_to="company_logos/", blank=True, null=True)

    def __str__(self):
        return f"Employer Profile: {self.company_name}"


class PendingUser(models.Model):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150)
    password = models.CharField(max_length=255)  # store hashed
    role = models.CharField(max_length=20, default="jobseeker")
    otp = models.CharField(max_length=6)
    otp_created_at = models.DateTimeField(auto_now_add=True) 
    created_at = models.DateTimeField(auto_now_add=True)

    def is_otp_valid(self):
        expiry_time = self.otp_created_at + timedelta(seconds=30)
        return timezone.now() <= expiry_time

