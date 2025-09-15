from django.urls import path
from .views import MyProfileView

urlpatterns = [
    path("myprofile/", MyProfileView.as_view(), name="my-profile"),
]
