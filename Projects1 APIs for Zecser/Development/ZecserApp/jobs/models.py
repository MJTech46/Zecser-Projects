from django.db import models
from django.conf import settings
from profiles.models import CompanyProfile, EmployerProfile, JobSeekerProfile

User = settings.AUTH_USER_MODEL


class JobPost(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    location = models.CharField(max_length=255, blank=True, null=True)
    job_type = models.CharField(
        max_length=50,
        choices=[
            ("full_time", "Full Time"),
            ("part_time", "Part Time"),
            ("remote", "Remote"),
            ("internship", "Internship"),
        ],
    )
    salary_range = models.CharField(max_length=100, blank=True, null=True)
    deadline = models.DateTimeField()

    # Relations
    posted_by = models.ForeignKey(
        EmployerProfile,
        on_delete=models.CASCADE,
        related_name="job_posts",
        null=True,
        blank=True
    )
    company = models.ForeignKey(
        CompanyProfile,
        on_delete=models.CASCADE,
        related_name="job_posts",
        null=True,
        blank=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def is_active(self):
        from django.utils import timezone
        return self.deadline > timezone.now()

    def __str__(self):
        return self.title


class JobApplication(models.Model):
    job = models.ForeignKey(JobPost, on_delete=models.CASCADE, related_name="applications")
    applicant = models.ForeignKey(JobSeekerProfile, on_delete=models.CASCADE, related_name="applications")
    cover_letter = models.TextField(blank=True, null=True)
    resume = models.FileField(upload_to="applications/resumes/", blank=True, null=True)

    applied_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.applicant.profile.user.username} -> {self.job.title}"
