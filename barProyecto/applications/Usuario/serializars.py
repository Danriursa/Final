from rest_framework import serializers
from .models import *

class EmpleadoSerializar(serializers.ModelSerializer):
    class Meta:
        model = Empleado
        fields = (
            '__all__'
        )

class TipoEmpleadoSerializar(serializers.ModelSerializer):
    class Meta:
        model = TipoEmpleado
        fields = (
            'id',
            'nombre'
        )
