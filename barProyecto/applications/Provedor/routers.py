from rest_framework.routers import DefaultRouter

from . import viewsets

router = DefaultRouter()

router.register(r'proveedor',viewsets.ProveedorViewSet, basename="proveedor")
router.register(r'proveedorproducto',viewsets.ProveedorProductoViewSet, basename="proveedorproducto")
router.register(r'precio',viewsets.PrecioViewSet, basename="precio")

urlpatterns = router.urls