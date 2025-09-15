from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from .models import Profile, JobSeekerProfile, EmployerProfile

User = settings.AUTH_USER_MODEL


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        # Create base Profile
        profile = Profile.objects.create(user=instance)

        # Create role-specific profile
        if instance.role == "jobseeker":
            JobSeekerProfile.objects.create(profile=profile)
        elif instance.role == "employer":
            EmployerProfile.objects.create(profile=profile)
