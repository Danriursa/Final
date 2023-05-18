from rest_framework import viewsets
from .models import *
from .serializars import *

class VentaViewSet(viewsets.ModelViewSet):
    serializer_class = VentaSerializar
    queryset = Venta.objects.all()

class VentaProductoViewSet(viewsets.ModelViewSet):
    serializer_class = VentaProductoSerializar
    queryset = VentaProducto.objects.all()