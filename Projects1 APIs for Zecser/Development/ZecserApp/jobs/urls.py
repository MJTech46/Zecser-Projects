from django.urls import path
from .views import (
    JobPostCreateView,
    JobPostListView,
    JobApplicationCreateView,
    JobApplicationListView,
    JobPostsByCompanyView,
    JobPostsByEmployerView,
)

urlpatterns = [
    path("post/", JobPostCreateView.as_view(), name="job-create"),
    path("list/", JobPostListView.as_view(), name="job-list"),
    path("apply/", JobApplicationCreateView.as_view(), name="job-apply"),
    path("applications/<int:job_id>/", JobApplicationListView.as_view(), name="job-applications"),
    path("list/company/<int:company_id>/", JobPostsByCompanyView.as_view(), name="job-posts-by-company"),
    path("list/employer/<int:employer_id>/", JobPostsByEmployerView.as_view(), name="job-posts-by-employer"),
]
