from rest_framework import generics, permissions
from rest_framework.exceptions import PermissionDenied
from .models import Event
from .serializers import EventSerializer, EventCreateUpdateSerializer


# List events (all users can view)
class EventListView(generics.ListAPIView):
    queryset = Event.objects.all().order_by("-created_at")
    serializer_class = EventSerializer
    permission_classes = [permissions.AllowAny]


# Create event (any authenticated user)
class EventCreateView(generics.CreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventCreateUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(posted_by=self.request.user)


# Update/Delete event (only owner)
class EventUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventCreateUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_update(self, serializer):
        event = self.get_object()
        if event.posted_by != self.request.user:
            raise PermissionDenied("You can only update your own events.")
        serializer.save()

    def update(self, request, *args, **kwargs):
        kwargs['partial'] = True   # allow partial updates
        return super().update(request, *args, **kwargs)

