from django.urls import path
from .views import EventListView, EventCreateView, EventUpdateDeleteView, EventImageDeleteView, EventLikeView, EventDislikeView

urlpatterns = [
    path("list/", EventListView.as_view(), name="event-list"),
    path("create/", EventCreateView.as_view(), name="event-create"),
    path("<int:pk>/", EventUpdateDeleteView.as_view(), name="event-detail"),
    path("images/<int:pk>/delete/", EventImageDeleteView.as_view(), name="event-image-delete"),
    path("<int:event_id>/like/", EventLikeView.as_view(), name="event-like"),
    path("<int:event_id>/dislike/", EventDislikeView.as_view(), name="event-dislike"),
]
