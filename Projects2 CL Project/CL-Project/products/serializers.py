# products/serializers.py
from rest_framework import serializers
from .models import Category, Product, Inventory, RestockAlert

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "slug", "description", "created_at"]

class InventorySerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Inventory
        fields = ["id", "product", "quantity", "reorder_threshold", "updated_at"]

class ProductSerializer(serializers.ModelSerializer):
    inventory = InventorySerializer(read_only=True)
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), allow_null=True, required=False)

    class Meta:
        model = Product
        fields = [
            "id", "sku", "name", "description", "price",
            "category", "is_active", "created_at", "updated_at", "inventory",
        ]

    def validate_sku(self, value):
        # example: uppercase SKU
        return value.strip()

class RestockAlertSerializer(serializers.ModelSerializer):
    product = serializers.StringRelatedField(read_only=True)
    inventory = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = RestockAlert
        fields = ["id", "product", "inventory", "quantity", "threshold", "created_at", "resolved", "note"]
