from rest_framework import serializers
from .models import UserProfile, JobSeekerProfile, EmployerProfile, CompanyProfile


class JobSeekerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobSeekerProfile
        fields = ["skills", "location", "resume"]


class CompanyProfileSerializer(serializers.ModelSerializer):
    created_by = serializers.ReadOnlyField(source="created_by.username")

    class Meta:
        model = CompanyProfile
        fields = [
            "id",
            "company_name",
            "company_website",
            "company_description",
            "company_logo",
            "location",
            "founded_year",
            "employee_count",
            "created_by",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_by", "created_at", "updated_at"]


class EmployerProfileSerializer(serializers.ModelSerializer):
    # show company details
    company_details = CompanyProfileSerializer(source="company", read_only=True)
    # allow only company ID editing
    company = serializers.PrimaryKeyRelatedField(
        queryset=CompanyProfile.objects.all(),
        required=False,
        allow_null=True
    )

    class Meta:
        model = EmployerProfile
        fields = ["id", "company", "company_details"]
        read_only_fields = ["id"]


class ProfileSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source="user.first_name", required=False)
    last_name = serializers.CharField(source="user.last_name", required=False)
    role = serializers.CharField(source="user.role", read_only=True)

    # Nested serializers
    jobseeker_profile = JobSeekerProfileSerializer(required=False)
    employer_profile = EmployerProfileSerializer(required=False)

    class Meta:
        model = UserProfile
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

    def update(self, instance, validated_data):
        # Update user fields
        user_data = validated_data.pop("user", {})
        if user_data:
            instance.user.first_name = user_data.get("first_name", instance.user.first_name)
            instance.user.last_name = user_data.get("last_name", instance.user.last_name)
            instance.user.save()

        # Update JobSeeker profile
        jobseeker_data = validated_data.pop("jobseeker_profile", None)
        if jobseeker_data and hasattr(instance, "jobseeker_profile"):
            for attr, value in jobseeker_data.items():
                setattr(instance.jobseeker_profile, attr, value)
            instance.jobseeker_profile.save()

        # Update Employer profile
        employer_data = validated_data.pop("employer_profile", None)
        if employer_data and hasattr(instance, "employer_profile"):
            for attr, value in employer_data.items():
                setattr(instance.employer_profile, attr, value)
            instance.employer_profile.save()

        # Update profile fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance
