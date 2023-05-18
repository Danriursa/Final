from rest_framework import viewsets
from .models import *
from .serializars import *

class ProveedorViewSet(viewsets.ModelViewSet):
    serializer_class = ProveedorSerializar
    queryset = Proveedor.objects.all()

class PrecioViewSet(viewsets.ModelViewSet):
    serializer_class = PrecioSerializar
    queryset = Precio.objects.all()

class ProveedorProductoViewSet(viewsets.ModelViewSet):
    serializer_class = ProveedorProductoSerializar
    queryset = ProveedorProducto.objects.all()