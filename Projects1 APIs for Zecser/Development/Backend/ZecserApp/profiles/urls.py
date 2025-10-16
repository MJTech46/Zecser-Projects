from django.urls import path
from .views import (
    UserListView, 
    JobSeekerListView, 
    EmployerListView, 
    MyProfileView, 
    CompanyListView, 
    CompanyDetailView, 
    CompanyUpdateView,
    FollowUserView,
    UnfollowUserView,
    FollowerListView,
    FollowingListView,
    MyCompanyProfileView,
)

urlpatterns = [
    path("user/myprofile/", MyProfileView.as_view(), name="my-profile"),
    path("user/", UserListView.as_view(), name="user-list"),                      # all users
    path("user/jobseeker/", JobSeekerListView.as_view(), name="jobseeker-list"),  # jobseekers only
    path("user/employer/", EmployerListView.as_view(), name="employer-list"),     # employers only

    path("company/", CompanyListView.as_view(), name="company-list"),             # list all companies
    path("company/<int:id>/", CompanyDetailView.as_view(), name="company-detail"),# get single company by ID
    path("company/<int:id>/update/", CompanyUpdateView.as_view(), name="company-update"),  # update company profile by ID
    path("company/myprofile/", MyCompanyProfileView.as_view(), name="my-company-profile"),

    path("follow/<int:user_id>/", FollowUserView.as_view(), name="follow-user"),
    path("unfollow/<int:user_id>/", UnfollowUserView.as_view(), name="unfollow-user"),
    path("followers/<int:user_id>/", FollowerListView.as_view(), name="followers-list"),
    path("following/<int:user_id>/", FollowingListView.as_view(), name="following-list"),
]
