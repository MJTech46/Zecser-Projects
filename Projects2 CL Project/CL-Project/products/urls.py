# products/urls.py
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, ProductViewSet, InventoryViewSet, RestockAlertViewSet

router = DefaultRouter()
router.register(r"categories", CategoryViewSet, basename="category")
router.register(r"products", ProductViewSet, basename="product")
router.register(r"inventories", InventoryViewSet, basename="inventory")
router.register(r"restock-alerts", RestockAlertViewSet, basename="restockalert")

urlpatterns = router.urls
