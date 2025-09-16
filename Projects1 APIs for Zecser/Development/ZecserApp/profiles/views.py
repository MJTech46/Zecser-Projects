from rest_framework import generics, permissions
from rest_framework.exceptions import ValidationError
from .models import UserProfile, CompanyProfile
from .serializers import CompanyProfileSerializer
from .serializers import ProfileSerializer

# Get or update own profile
class MyProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.profile # UserProfile is linked via 'profile' related_name

# Get all users
class UserListView(generics.ListAPIView):
    queryset = UserProfile.objects.select_related("user").all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]  # or IsAdminUser if restricted


# Get only Jobseekers
class JobSeekerListView(generics.ListAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return UserProfile.objects.filter(user__role="jobseeker")


# Get only Employers
class EmployerListView(generics.ListAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return UserProfile.objects.filter(user__role="employer")




# Create a new company profile
class CompanyCreateView(generics.CreateAPIView):
    queryset = CompanyProfile.objects.all()
    serializer_class = CompanyProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        if user.role != "employer":  # only employers allowed
            raise ValidationError(
                {"error": "Only employers can create a company profile."}
            )
        serializer.save(created_by=user)


# Get all companies
class CompanyListView(generics.ListAPIView):
    queryset = CompanyProfile.objects.all()
    serializer_class = CompanyProfileSerializer
    permission_classes = [permissions.IsAuthenticated]  # or IsAdminUser if you want to restrict


# Get a single company by ID
class CompanyDetailView(generics.RetrieveAPIView):
    queryset = CompanyProfile.objects.all()
    serializer_class = CompanyProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = "id"


class CompanyUpdateView(generics.RetrieveUpdateAPIView):
    queryset = CompanyProfile.objects.all()
    serializer_class = CompanyProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = "id"

    def perform_update(self, serializer):
        company = self.get_object()
        if company.created_by != self.request.user:
            raise PermissionDenied("Only the company creator can update this profile.")
        serializer.save()