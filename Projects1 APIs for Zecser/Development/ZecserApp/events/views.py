from rest_framework import generics, permissions, status 
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response 
from .models import Event, EventReaction, EventComment
from .serializers import EventSerializer, EventCreateUpdateSerializer, EventImage, EventCommentSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404


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
    

class EventLikeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, event_id):
        event = get_object_or_404(Event, id=event_id)

        # Check if user already liked
        existing_reaction = EventReaction.objects.filter(event=event, user=request.user).first()

        if existing_reaction and existing_reaction.reaction == "like":
            # Toggle off like
            existing_reaction.delete()
            message = "Like removed"
        else:
            # Remove any dislike and add like
            EventReaction.objects.filter(event=event, user=request.user, reaction="dislike").delete()
            EventReaction.objects.update_or_create(
                event=event, user=request.user,
                defaults={"reaction": "like"}
            )
            message = "Event liked"

        return Response({
            "message": message,
            "like_count": event.reactions.filter(reaction="like").count(),
            "dislike_count": event.reactions.filter(reaction="dislike").count()
        }, status=status.HTTP_200_OK)


class EventDislikeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, event_id):
        event = get_object_or_404(Event, id=event_id)

        # Check if user already disliked
        existing_reaction = EventReaction.objects.filter(event=event, user=request.user).first()

        if existing_reaction and existing_reaction.reaction == "dislike":
            # Toggle off dislike
            existing_reaction.delete()
            message = "Dislike removed"
        else:
            # Remove any like and add dislike
            EventReaction.objects.filter(event=event, user=request.user, reaction="like").delete()
            EventReaction.objects.update_or_create(
                event=event, user=request.user,
                defaults={"reaction": "dislike"}
            )
            message = "Event disliked"

        return Response({
            "message": message,
            "like_count": event.reactions.filter(reaction="like").count(),
            "dislike_count": event.reactions.filter(reaction="dislike").count()
        }, status=status.HTTP_200_OK)

# List + Create Comments
class EventCommentListCreateView(generics.ListCreateAPIView):
    serializer_class = EventCommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        event_id = self.kwargs["event_id"]
        return EventComment.objects.filter(event_id=event_id).order_by("-created_at")

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            "comment_count": queryset.count(),  
            "comments": serializer.data
        })

    def perform_create(self, serializer):
        event_id = self.kwargs["event_id"]
        event = get_object_or_404(Event, id=event_id)
        serializer.save(user=self.request.user, event=event)



# Update + Delete Comment
class EventCommentUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = EventComment.objects.all()
    serializer_class = EventCommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_update(self, serializer):
        comment = self.get_object()
        if comment.user != self.request.user:
            raise PermissionDenied("You can only edit your own comments.")
        serializer.save()

    def delete(self, request, *args, **kwargs):
        comment = self.get_object()
        if comment.user != self.request.user and comment.event.posted_by != self.request.user:
            raise PermissionDenied("Only the comment owner or event owner can delete this comment.")
        comment.delete()
        return Response({"message": "Comment deleted successfully."}, status=200)

