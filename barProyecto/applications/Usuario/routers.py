from rest_framework.routers import DefaultRouter

from . import viewsets

router = DefaultRouter()

router.register(r'empleado',viewsets.EmpleadoViewSet, basename="empleado")
router.register(r'tipoempleado',viewsets.TipoEmpleadoViewSet, basename="tipoempleado")

urlpatterns = router.urls