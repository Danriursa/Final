from rest_framework import serializers
from .models import *

class VentaSerializar(serializers.ModelSerializer):
    class Meta:
        model = Venta
        fields = (
            'id',
            'estado',
            'fecha',
            'mesa_id',
            'sede_id'

        )

class VentaProductoSerializar(serializers.ModelSerializer):
    class Meta:
        model = VentaProducto
        fields = (
            'id',
            'cantidad',
            'producto_id',
            'venta_id'
        )
