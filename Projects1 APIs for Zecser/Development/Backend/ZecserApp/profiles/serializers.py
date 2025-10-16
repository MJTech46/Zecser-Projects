from rest_framework import serializers
from .models import UserProfile, JobSeekerProfile, EmployerProfile, CompanyProfile, Follow


class JobSeekerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobSeekerProfile
        fields = ["skills", "location", "resume"]


class EmployerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployerProfile
        fields = ["company"]


class CompanyProfileSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source="CompanyProfile.id", read_only=True)
    email = serializers.EmailField(source="created_by.email", read_only=True)
    created_by = serializers.ReadOnlyField(source="created_by.username")

    class Meta:
        model = CompanyProfile
        fields = [
            "id",
            "email",
            "company_name",
            "company_website",
            "company_description",
            "company_overview",
            "company_services",
            "company_logo",
            "company_cover",
            "location",
            "founded_year",
            "employee_count",
            "created_by",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_by", "created_at", "updated_at"]


class ProfileSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source="user.id", read_only=True)
    email = serializers.EmailField(source="user.email", read_only=True)
    first_name = serializers.CharField(source="user.first_name", required=False)
    last_name = serializers.CharField(source="user.last_name", required=False)
    role = serializers.CharField(source="user.role", read_only=True)

    # Nested profiles
    jobseeker_profile = JobSeekerProfileSerializer(required=False)
    employer_profile = EmployerProfileSerializer(required=False)
    company_profile = CompanyProfileSerializer(source="user.company_profile", required=False)


    class Meta:
        model = UserProfile
        fields = [
            "id",
            "first_name",
            "last_name",
            "email",
            "role",
            "phone",
            "bio",
            "profile_picture",
            "cover_picture",
            "jobseeker_profile",
            "employer_profile",
            "company_profile",   # added company profile
        ]
        read_only_fields = ["id"," email", "role"]

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

        # Update Company profile
        company_data = validated_data.pop("user", {}).pop("company_profile", None)
        if company_data and hasattr(instance.user, "company_profile"):
            for attr, value in company_data.items():
                setattr(instance.user.company_profile, attr, value)
            instance.user.company_profile.save()


        # Update profile fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance

    def to_representation(self, instance):
        data = super().to_representation(instance)

        # Flatten jobseeker profile
        if data["role"] == "jobseeker" and data.get("jobseeker_profile"):
            jobseeker_data = data.pop("jobseeker_profile")
            data.update(jobseeker_data)
            data.pop("employer_profile", None)
            data.pop("company_profile", None)

        # Flatten employer profile
        elif data["role"] == "employer" and data.get("employer_profile"):
            employer_data = data.pop("employer_profile")
            data.update(employer_data)
            data.pop("jobseeker_profile", None)
            data.pop("company_profile", None)

        # Flatten company profile
        elif data["role"] == "company" and data.get("company_profile"):
            company_data = data.pop("company_profile")
            data.update(company_data)
            data.pop("jobseeker_profile", None)
            data.pop("employer_profile", None)

        return data


class FollowSerializer(serializers.ModelSerializer):
    follower_username = serializers.ReadOnlyField(source="follower.username")
    following_username = serializers.ReadOnlyField(source="following.username")

    class Meta:
        model = Follow
        fields = ["id", "follower", "follower_username", "following", "following_username", "created_at"]
        read_only_fields = ["id", "follower", "created_at"]
