# products/signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Product, Inventory, RestockAlert

@receiver(post_save, sender=Product)
def ensure_inventory_for_product(sender, instance, created, **kwargs):
    if created:
        Inventory.objects.create(product=instance)

@receiver(post_save, sender=Inventory)
def create_restock_alert(sender, instance, created, **kwargs):
    # create an alert only when quantity is <= threshold and not already resolved
    if instance.quantity <= instance.reorder_threshold:
        # Avoid duplicate active alerts: check for unresolved alerts for same inventory
        existing = RestockAlert.objects.filter(inventory=instance, resolved=False)
        if not existing.exists():
            RestockAlert.objects.create(
                product=instance.product,
                inventory=instance,
                quantity=instance.quantity,
                threshold=instance.reorder_threshold,
                note=f"Auto-generated: quantity {instance.quantity} <= threshold {instance.reorder_threshold}"
            )
        else:
            # Optionally, update existing alert's quantity and threshold
            alert = existing.first()
            alert.quantity = instance.quantity
            alert.threshold = instance.reorder_threshold
            alert.note=f"Auto-generated: quantity {instance.quantity} <= threshold {instance.reorder_threshold}"
            alert.save()

        # For demonstration, print alert creation
        print(f"\n\nRestock Alert: Product '{instance.product.name}' stock is low ({instance.quantity})\n\n")
