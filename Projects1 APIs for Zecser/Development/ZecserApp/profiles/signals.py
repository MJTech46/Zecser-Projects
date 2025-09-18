from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from .models import UserProfile, JobSeekerProfile, EmployerProfile, CompanyProfile

User = settings.AUTH_USER_MODEL

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_user_related_profiles(sender, instance, created, **kwargs):
    if created:
        # Create base profile
        profile = UserProfile.objects.create(user=instance)

        # Jobseeker auto profile
        if instance.role == "jobseeker":
            JobSeekerProfile.objects.create(profile=profile)

        # Employer auto profile
        elif instance.role == "employer":
            EmployerProfile.objects.create(profile=profile)

        # Company auto profile
        elif instance.role == "company":
            # Prefer first_name + last_name
            full_name = f"{instance.first_name} {instance.last_name}".strip()
            if not full_name:  
                full_name = instance.username  # fallback if names missing

            CompanyProfile.objects.create(
                created_by=instance,
                company_name=full_name
            )

