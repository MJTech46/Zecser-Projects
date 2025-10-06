from rest_framework import serializers
from .models import Event, EventImage, EventComment


class EventImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventImage
        fields = ["id", "image"]


class EventSerializer(serializers.ModelSerializer):
    images = EventImageSerializer(many=True, read_only=True)
    like_count = serializers.SerializerMethodField()
    dislike_count = serializers.SerializerMethodField()
    comment_count = serializers.SerializerMethodField()
    posted_by_username = serializers.CharField(source="posted_by.username", read_only=True)

    class Meta:
        model = Event
        fields = [
            "id",
            "title",
            "description",
            "location",
            "start_date",
            "end_date",
            "posted_by",
            "posted_by_username",
            "images",
            "like_count",
            "dislike_count",
            "comment_count",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id", 
            "posted_by", 
            "created_at", 
            "updated_at", 
            "like_count", 
            "dislike_count", 
            "comments", 
            "posted_by_username"
        ]

    def get_like_count(self, obj):
        return obj.reactions.filter(reaction="like").count()

    def get_dislike_count(self, obj):
        return obj.reactions.filter(reaction="dislike").count()

    def get_comment_count(self, obj):
        return obj.comments.count()




class EventCreateUpdateSerializer(serializers.ModelSerializer):
    images = serializers.ListField(
        child=serializers.ImageField(), required=False, write_only=True
    )

    title = serializers.CharField(required=False)
    description = serializers.CharField(required=False)
    location = serializers.CharField(required=False)
    start_date = serializers.DateTimeField(required=False)
    end_date = serializers.DateTimeField(required=False)

    class Meta:
        model = Event
        fields = [
            "title",
            "description",
            "location",
            "start_date",
            "end_date",
            "images",
        ]

    def create(self, validated_data):
        images = validated_data.pop("images", [])
        event = Event.objects.create(**validated_data)

        for image in images:
            EventImage.objects.create(event=event, image=image)

        return event

    def update(self, instance, validated_data):
        images = validated_data.pop("images", [])
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if images:
            instance.images.all().delete()
            for image in images:
                EventImage.objects.create(event=instance, image=image)

        return instance

class EventCommentSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source="user.username")

    class Meta:
        model = EventComment
        fields = ["id", "event", "user", "username", "content", "created_at", "updated_at"]
        read_only_fields = ["id", "event", "user", "username", "created_at", "updated_at"]
