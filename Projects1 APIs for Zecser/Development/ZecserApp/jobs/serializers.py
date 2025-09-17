from rest_framework import serializers
from .models import JobPost, JobApplication


class JobPostSerializer(serializers.ModelSerializer):
    is_active = serializers.ReadOnlyField()
    posted_by = serializers.ReadOnlyField(source="posted_by.profile.user.username")
    company_name = serializers.ReadOnlyField(source="company.company_name")

    class Meta:
        model = JobPost
        fields = [
            "id",
            "title",
            "description",
            "location",
            "job_type",
            "salary_range",
            "deadline",
            "is_active",
            "posted_by",
            "company_name",
            "created_at",
        ]


class JobApplicationSerializer(serializers.ModelSerializer):
    applicant = serializers.ReadOnlyField(source="applicant.profile.user.username")
    job_title = serializers.ReadOnlyField(source="job.title")

    class Meta:
        model = JobApplication
        fields = [
            "id",
            "job",
            "job_title",
            "applicant",
            "cover_letter",
            "resume",
            "applied_at",
        ]
        read_only_fields = ["id", "job_title", "applicant", "applied_at"]


class JobPostListSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source="company.company_name", read_only=True)
    employer_username = serializers.CharField(source="posted_by.username", read_only=True)

    class Meta:
        model = JobPost
        fields = [
            "id",
            "title",
            "description",
            "location",
            "job_type",
            "salary_range",
            "deadline",
            "is_active",
            "company_name",
            "employer_username",
        ]
