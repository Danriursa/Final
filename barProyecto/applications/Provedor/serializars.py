from rest_framework import serializers
from .models import *

class ProveedorSerializar(serializers.ModelSerializer):
    class Meta:
        model = Proveedor
        fields = (
            'id',
            'nombres',
            'direccion',
            'telefono'
        )

class PrecioSerializar(serializers.ModelSerializer):
    class Meta:
        model = Precio
        fields = (
            'id',
            'producto',
            'proveedor_id',
            'precio_compra',
            'precio_venta',
            'fecha_inicio',
            'fecha_final'
        )

class ProveedorProductoSerializar(serializers.ModelSerializer):
    class Meta:
        model = ProveedorProducto
        fields = (
            'id',
            'precio_compra',
            'producto_id',
            'proveedor_id',
        )