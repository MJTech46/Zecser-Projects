from rest_framework import serializers
from .models import Profile, JobSeekerProfile, EmployerProfile


class JobSeekerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobSeekerProfile
        fields = ["skills", "location", "resume"]


class EmployerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployerProfile
        fields = ["company_name", "company_website", "company_description", "company_logo"]


class ProfileSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source="user.first_name", required=False)
    last_name = serializers.CharField(source="user.last_name", required=False)
    role = serializers.CharField(source="user.role", read_only=True)

    # Nested profiles
    jobseeker_profile = JobSeekerProfileSerializer(read_only=True)
    employer_profile = EmployerProfileSerializer(read_only=True)

    class Meta:
        model = Profile
        fields = [
            "id",
            "first_name",
            "last_name",
            "role",
            "phone",
            "bio",
            "profile_picture",
            "cover_picture",
            "jobseeker_profile",
            "employer_profile",
        ]
        read_only_fields = ["id"]

    def to_representation(self, instance):
        data = super().to_representation(instance)

        # Flatten jobseeker profile
        if data["role"] == "jobseeker" and data.get("jobseeker_profile"):
            jobseeker_data = data.pop("jobseeker_profile")
            data.update(jobseeker_data)  # merge nested fields into main dict
            data.pop("employer_profile", None)  # remove employer fields

        # Flatten employer profile
        elif data["role"] == "employer" and data.get("employer_profile"):
            employer_data = data.pop("employer_profile")
            data.update(employer_data)
            data.pop("jobseeker_profile", None)

        return data

