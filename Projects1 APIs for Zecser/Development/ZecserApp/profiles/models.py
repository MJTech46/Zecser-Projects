from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    phone = models.CharField(max_length=15, blank=True, null=True)
    profile_picture = models.ImageField(upload_to="profile_pics/", blank=True, null=True)
    cover_picture = models.ImageField(upload_to="cover_pictures/", blank=True, null=True)
    bio = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.user.username} Profile"


class JobSeekerProfile(models.Model):
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE, related_name="jobseeker_profile")
    skills = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    resume = models.FileField(upload_to='resumes/', blank=True, null=True)

    def __str__(self):
        return f"Job Seeker Profile: {self.profile.user.username}"


class EmployerProfile(models.Model):
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE, related_name="employer_profile")
    company_name = models.CharField(max_length=255)
    company_website = models.URLField(blank=True, null=True)
    company_description = models.TextField(blank=True, null=True)
    company_logo = models.ImageField(upload_to="company_logos/", blank=True, null=True)

    def __str__(self):
        return f"Employer Profile: {self.company_name}"
