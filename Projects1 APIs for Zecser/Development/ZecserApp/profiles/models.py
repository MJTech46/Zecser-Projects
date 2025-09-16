from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    phone = models.CharField(max_length=15, blank=True, null=True)
    profile_picture = models.ImageField(upload_to="profile_pics/", blank=True, null=True)
    cover_picture = models.ImageField(upload_to="cover_pictures/", blank=True, null=True)
    bio = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.user.username} Profile"


class CompanyProfile(models.Model):
    company_name = models.CharField(max_length=255, unique=True)
    company_website = models.URLField(blank=True, null=True)
    company_description = models.TextField(blank=True, null=True)
    company_logo = models.ImageField(upload_to="company_logos/", blank=True, null=True)
    
    # Extra fields
    location = models.CharField(max_length=255, blank=True, null=True)
    founded_year = models.PositiveIntegerField(blank=True, null=True)
    employee_count = models.PositiveIntegerField(blank=True, null=True)

    # Root/owner of the company
    created_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="companies_created"
    )

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.company_name


class JobSeekerProfile(models.Model):
    profile = models.OneToOneField(UserProfile, on_delete=models.CASCADE, related_name="jobseeker_profile")
    skills = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    resume = models.FileField(upload_to="resumes/", blank=True, null=True)

    def __str__(self):
        return f"Job Seeker Profile: {self.profile.user.username}"


class EmployerProfile(models.Model):
    profile = models.OneToOneField(UserProfile, on_delete=models.CASCADE, related_name="employer_profile")
    company = models.ForeignKey(
        CompanyProfile,
        on_delete=models.SET_NULL,   # if company gets deleted, employer remains
        related_name="employers",
        null=True,
        blank=True
    )

    def __str__(self):
        if self.company:
            return f"{self.profile.user.username} -> {self.company.company_name}"
        return f"{self.profile.user.username} (No company yet)"
