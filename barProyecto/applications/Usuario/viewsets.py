from rest_framework import viewsets
from .models import *
from .serializars import *

class EmpleadoViewSet(viewsets.ModelViewSet):
    serializer_class = EmpleadoSerializar
    queryset = Empleado.objects.all()

class TipoEmpleadoViewSet(viewsets.ModelViewSet):
    serializer_class = TipoEmpleadoSerializar
    queryset = TipoEmpleado.objects.all()