from django.urls import path
from .views import EventListView, EventCreateView, EventUpdateDeleteView

urlpatterns = [
    path("list/", EventListView.as_view(), name="event-list"),
    path("create/", EventCreateView.as_view(), name="event-create"),
    path("<int:pk>/", EventUpdateDeleteView.as_view(), name="event-detail"),
]
