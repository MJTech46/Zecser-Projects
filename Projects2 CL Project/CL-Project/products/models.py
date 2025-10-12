# products/models.py
from django.db import models
from django.utils import timezone

class Category(models.Model):
    name = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(max_length=200, unique=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name

class Product(models.Model):
    sku = models.CharField(max_length=64, unique=True)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    category = models.ForeignKey(Category, related_name="products", on_delete=models.SET_NULL, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]
        indexes = [
            models.Index(fields=["sku"]),
            models.Index(fields=["name"]),
        ]

    def __str__(self):
        return f"{self.name} ({self.sku})"

class Inventory(models.Model):
    product = models.OneToOneField(Product, related_name="inventory", on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    reorder_threshold = models.IntegerField(default=0)  # when to create a restock alert
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.product.sku} — qty: {self.quantity}"

class RestockAlert(models.Model):
    product = models.ForeignKey(Product, related_name="restock_alerts", on_delete=models.CASCADE)
    inventory = models.ForeignKey(Inventory, related_name="restock_alerts", on_delete=models.CASCADE)
    quantity = models.IntegerField()
    threshold = models.IntegerField()
    created_at = models.DateTimeField(default=timezone.now)
    resolved = models.BooleanField(default=False)
    note = models.TextField(blank=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Alert: {self.product.sku} qty={self.quantity} <= {self.threshold}"
