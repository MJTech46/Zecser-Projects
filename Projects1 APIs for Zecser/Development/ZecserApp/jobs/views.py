from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.utils import timezone
from .models import JobPost, JobApplication
from .serializers import JobPostSerializer, JobApplicationSerializer, JobPostListSerializer
from profiles.models import EmployerProfile, JobSeekerProfile, CompanyProfile


# Create job post (Employers or Companies)
class JobPostCreateView(generics.CreateAPIView):
    queryset = JobPost.objects.all()
    serializer_class = JobPostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user

        # Company user posts a job
        if user.role == "company":
            company_profile = getattr(user, "company_profile", None)
            if not company_profile:
                return Response({"error": "Company profile not found"}, status=400)

            serializer.save(posted_by=user, company=company_profile)
            return

        # Employer posts a job
        if user.role == "employer":
            employer_profile = getattr(user.profile, "employer_profile", None)
            if not employer_profile:
                return Response({"error": "Employer profile not found"}, status=400)

            serializer.save(
                posted_by=user,
                company=employer_profile.company
            )
            return

        return Response({"error": "Only employers or companies can post jobs"}, status=403)


# List all active jobs
class JobPostListView(generics.ListAPIView):
    serializer_class = JobPostListSerializer
    permission_classes = [permissions.AllowAny]  # anyone can browse jobs

    def get_queryset(self):
        now = timezone.now()
        return JobPost.objects.filter(deadline__gt=now).order_by("-created_at")


# Apply to a job (Jobseekers only)
class JobApplicationCreateView(generics.CreateAPIView):
    queryset = JobApplication.objects.all()
    serializer_class = JobApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        if user.role != "jobseeker":
            return Response({"error": "Only jobseekers can apply"}, status=403)

        jobseeker_profile = getattr(user.profile, "jobseeker_profile", None)
        if not jobseeker_profile:
            return Response({"error": "Jobseeker profile not found"}, status=400)

        serializer.save(applicant=user)


# View job applications (Employer who posted OR Company owner)
class JobApplicationListView(generics.ListAPIView):
    serializer_class = JobApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        job_id = self.kwargs["job_id"]

        try:
            job = JobPost.objects.get(id=job_id)
        except JobPost.DoesNotExist:
            return JobApplication.objects.none()

        # Employer who posted the job
        if user.role == "employer" and job.posted_by == user:
            return job.applications.all()

        # Company owner
        if user.role == "company" and job.company and job.company.created_by == user:
            return job.applications.all()

        return JobApplication.objects.none()


# List jobs by company
class JobPostsByCompanyView(generics.ListAPIView):
    serializer_class = JobPostListSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        company_id = self.kwargs["company_id"]
        return JobPost.objects.filter(company_id=company_id).order_by("-created_at")


# List jobs by employer
class JobPostsByEmployerView(generics.ListAPIView):
    serializer_class = JobPostListSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        employer_id = self.kwargs["employer_id"]
        return JobPost.objects.filter(posted_by_id=employer_id).order_by("-created_at")
