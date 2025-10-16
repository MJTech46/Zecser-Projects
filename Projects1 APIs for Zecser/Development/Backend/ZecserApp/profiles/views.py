from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions, status
from rest_framework.exceptions import ValidationError, PermissionDenied
from rest_framework.response import Response

from accounts.models import User
from .models import UserProfile, CompanyProfile, Follow

from .serializers import CompanyProfileSerializer
from .serializers import ProfileSerializer, FollowSerializer


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

# my company profile (for the logged-in user)
class MyCompanyProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = CompanyProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        try:
            return CompanyProfile.objects.get(created_by=self.request.user)
        except CompanyProfile.DoesNotExist:
            raise NotFound("Company profile not found for this user.")

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
    

class FollowUserView(generics.CreateAPIView):
    serializer_class = FollowSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        following_id = kwargs.get("user_id")
        following_user = get_object_or_404(User, id=following_id)

        if request.user == following_user:
            return Response({"error": "You cannot follow yourself."}, status=400)

        follow, created = Follow.objects.get_or_create(
            follower=request.user, following=following_user
        )

        if not created:
            return Response({"message": "Already following"}, status=200)

        return Response(FollowSerializer(follow).data, status=201)


class UnfollowUserView(generics.DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        following_id = kwargs.get("user_id")
        following_user = get_object_or_404(User, id=following_id)

        follow = Follow.objects.filter(follower=request.user, following=following_user)
        if follow.exists():
            follow.delete()
            return Response({"message": "Unfollowed successfully"}, status=200)
        return Response({"error": "Not following this user"}, status=400)


class FollowerListView(generics.ListAPIView):
    serializer_class = FollowSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        user_id = self.kwargs["user_id"]
        return Follow.objects.filter(following_id=user_id)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        followers_count = queryset.count()  # count followers

        return Response({
            "followers_count": followers_count,
            "followers": serializer.data
        })


class FollowingListView(generics.ListAPIView):
    serializer_class = FollowSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        user_id = self.kwargs["user_id"]
        return Follow.objects.filter(follower_id=user_id)