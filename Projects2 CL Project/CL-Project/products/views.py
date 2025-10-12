# products/views.py
from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend

from .models import Category, Product, Inventory, RestockAlert
from .serializers import (
    CategorySerializer, ProductSerializer,
    InventorySerializer, RestockAlertSerializer
)
from .filters import ProductFilter


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = "id"
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["name", "slug", "description"]
    ordering_fields = ["name", "created_at"]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(
            {"message": f"{self.__class__.__name__.replace('ViewSet','')} deleted successfully."},
            status=status.HTTP_204_NO_CONTENT
        )


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.select_related("category").prefetch_related("inventory")
    serializer_class = ProductSerializer
    filterset_class = ProductFilter
    filter_backends = [filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend]
    search_fields = ["name", "sku", "description"]
    ordering_fields = ["name", "price", "created_at", "updated_at"]
    ordering = ["name"]

    @action(detail=True, methods=["get"], url_path="inventory")
    def get_inventory(self, request, pk=None):
        product = self.get_object()
        inv = getattr(product, "inventory", None)
        if not inv:
            return Response({"detail": "Inventory not found."}, status=status.HTTP_404_NOT_FOUND)
        return Response(InventorySerializer(inv).data)

    @action(detail=True, methods=["post"], url_path="inventory/update")
    def update_inventory(self, request, pk=None):
        product = self.get_object()
        inv = getattr(product, "inventory", None)
        if not inv:
            inv = Inventory.objects.create(product=product)
        serializer = InventorySerializer(inv, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(
            {"message": f"{self.__class__.__name__.replace('ViewSet','')} deleted successfully."},
            status=status.HTTP_204_NO_CONTENT
        )


class InventoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Inventory.objects.select_related("product")
    serializer_class = InventorySerializer
    filter_backends = [filters.OrderingFilter, DjangoFilterBackend, filters.SearchFilter]
    search_fields = ["product__name", "product__sku"]
    ordering_fields = ["quantity", "updated_at"]


class RestockAlertViewSet(viewsets.ModelViewSet):
    queryset = RestockAlert.objects.select_related("product", "inventory")
    serializer_class = RestockAlertSerializer
    http_method_names = ["get", "post", "patch", "put", "delete"]
    filter_backends = [filters.OrderingFilter, filters.SearchFilter, DjangoFilterBackend]
    search_fields = ["product__name", "product__sku", "note"]
    ordering_fields = ["created_at", "quantity"]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(
            {"message": f"{self.__class__.__name__.replace('ViewSet','')} deleted successfully."},
            status=status.HTTP_204_NO_CONTENT
        )

