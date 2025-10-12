# products/filters.py
import django_filters
from .models import Product

class ProductFilter(django_filters.FilterSet):
    price_min = django_filters.NumberFilter(field_name="price", lookup_expr="gte")
    price_max = django_filters.NumberFilter(field_name="price", lookup_expr="lte")
    category = django_filters.NumberFilter(field_name="category__id")
    is_active = django_filters.BooleanFilter(field_name="is_active")

    class Meta:
        model = Product
        fields = ["category", "is_active", "price_min", "price_max", "sku", "name"]
