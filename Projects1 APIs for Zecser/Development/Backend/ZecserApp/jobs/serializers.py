from rest_framework import serializers
from .models import JobPost, JobApplication


class JobPostSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source="company.company_name", read_only=True)
    posted_by_username = serializers.CharField(source="posted_by.username", read_only=True)

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
            "company",
            "company_name",
            "posted_by",           # keep it here
            "posted_by_username",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "is_active",
            "company_name",
            "posted_by",           # mark as read-only
            "posted_by_username",
            "created_at",
            "updated_at",
        ]




class JobApplicationSerializer(serializers.ModelSerializer):
    job_title = serializers.CharField(source="job.title", read_only=True)
    applicant_username = serializers.CharField(source="applicant.username", read_only=True)

    class Meta:
        model = JobApplication
        fields = [
            "id",
            "job",
            "job_title",
            "applicant",
            "applicant_username",
            "cover_letter",
            "resume",
            "applied_at"
        ]
        read_only_fields = [
            "id",
            "job_title",
            "applicant",          # mark applicant as read-only
            "applicant_username",
            "applied_at"
        ]


    def create(self, validated_data):
        user = self.context["request"].user
        if user.role != "jobseeker":
            raise serializers.ValidationError("Only jobseekers can apply to jobs.")
        validated_data["applicant"] = user
        return super().create(validated_data)



class JobPostListSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source="company.company_name", read_only=True)
    employer_username = serializers.CharField(source="posted_by.username", read_only=True)
    applications_count = serializers.SerializerMethodField() 

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
            "applications_count",
        ]

    def get_applications_count(self, obj):
        return obj.applications.count()
