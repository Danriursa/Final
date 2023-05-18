from rest_framework.routers import DefaultRouter

from . import viewsets

router = DefaultRouter()

router.register(r'sede',viewsets.SedeViewSet, basename="sede")
router.register(r'productosede',viewsets.ProductoSedeViewSet, basename="productosede")
router.register(r'mesa',viewsets.MesaViewSet, basename="mesa")
router.register(r'producto',viewsets.ProductoViewSet, basename="producto")

urlpatterns = router.urls