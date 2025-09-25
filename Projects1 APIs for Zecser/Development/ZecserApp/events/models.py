from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL


class Event(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    location = models.CharField(max_length=255, blank=True, null=True)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()

    # Who posted it (jobseeker, employer, or company account)
    posted_by = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="events"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} ({self.posted_by})"


class EventImage(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to="event_images/")

    def __str__(self):
        return f"Image for {self.event.title}"

class EventReaction(models.Model):
    REACTION_CHOICES = (
        ("like", "Like"),
        ("dislike", "Dislike"),
    )

    event = models.ForeignKey("Event", on_delete=models.CASCADE, related_name="reactions")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="event_reactions")
    reaction = models.CharField(max_length=10, choices=REACTION_CHOICES)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("event", "user")  # prevent multiple reactions per event per user

    def __str__(self):
        return f"{self.user.username} {self.reaction} {self.event.title}"
