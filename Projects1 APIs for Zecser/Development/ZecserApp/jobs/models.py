from django.db import models
from django.conf import settings
from profiles.models import CompanyProfile, EmployerProfile, JobSeekerProfile

User = settings.AUTH_USER_MODEL


class JobPost(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    location = models.CharField(max_length=255)
    job_type = models.CharField(
        max_length=20,
        choices=[
            ("full_time", "Full Time"),
            ("part_time", "Part Time"),
            ("remote", "Remote"),
        ]
    )
    salary_range = models.CharField(max_length=100, blank=True, null=True)
    deadline = models.DateTimeField()

    posted_by = models.ForeignKey(   # always store who created job (employer or company)
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="jobs_posted"
    )
    company = models.ForeignKey(     # optional company link
        "profiles.CompanyProfile",
        on_delete=models.SET_NULL,
        related_name="job_posts",
        null=True,
        blank=True
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def is_active(self):
        from django.utils import timezone
        return self.deadline >= timezone.now()

    def __str__(self):
        return f"{self.title} ({'Active' if self.is_active else 'Expired'})"




class JobApplication(models.Model):
    job = models.ForeignKey(JobPost, on_delete=models.CASCADE, related_name="applications")
    applicant = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="applications")
    cover_letter = models.TextField(blank=True, null=True)
    resume = models.FileField(upload_to="applications/resumes/", blank=True, null=True)
    applied_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.applicant.username} -> {self.job.title}"

