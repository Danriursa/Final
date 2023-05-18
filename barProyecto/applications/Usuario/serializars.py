from rest_framework import serializers
from .models import *

class EmpleadoSerializar(serializers.ModelSerializer):
    class Meta:
        model = Empleado
        fields = (
            'id',
            'nombres',
            'apellidos',
            'correo',
            'direccion',
            'estado',
            'telefono',
            'sede_id',
            'tipo_empleado_id'

        )

class TipoEmpleadoSerializar(serializers.ModelSerializer):
    class Meta:
        model = TipoEmpleado
        fields = (
            'id',
            'nombre'
        )
