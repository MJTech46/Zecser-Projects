from rest_framework import generics, permissions, status 
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response 
from .models import Event
from .serializers import EventSerializer, EventCreateUpdateSerializer, EventImage


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

class EventImageDeleteView(generics.DestroyAPIView):
    queryset = EventImage.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def perform_destroy(self, instance):
        if instance.event.posted_by != self.request.user:
            raise PermissionDenied("You can only delete images from your own events.")
        instance.delete()

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({"message": "Image deleted successfully."}, status=status.HTTP_200_OK)