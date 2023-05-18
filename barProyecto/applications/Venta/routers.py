from rest_framework.routers import DefaultRouter

from . import viewsets

router = DefaultRouter()

router.register(r'venta',viewsets.VentaViewSet, basename="venta")
router.register(r'ventaproducto',viewsets.VentaProductoViewSet, basename="ventaproducto")

urlpatterns = router.urls