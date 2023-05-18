from rest_framework import viewsets
from .models import *
from .serializars import *

class SedeViewSet(viewsets.ModelViewSet):
    serializer_class = SedeSerializar
    queryset = Sede.objects.all()

class ProductoSedeViewSet(viewsets.ModelViewSet):
    serializer_class = ProductoSedeSerializar
    queryset = ProdutoSede.objects.all()
    
class MesaViewSet(viewsets.ModelViewSet):
    serializer_class = MesaSerializar
    queryset = Mesa.objects.all()

class ProductoViewSet(viewsets.ModelViewSet):
    serializer_class = ProductoSerializar
    queryset = Producto.objects.all()
