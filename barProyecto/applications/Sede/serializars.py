from rest_framework import serializers
from .models import *

class SedeSerializar(serializers.ModelSerializer):
    class Meta:
        model = Sede
        fields = (
            'id',
            'nombre',
            'direccion',
            'telefono'
        )

class ProductoSedeSerializar(serializers.ModelSerializer):
    class Meta:
        model = ProdutoSede
        fields = (
            'producto',
            'sede',
            'cantidad',
        )

class MesaSerializar(serializers.ModelSerializer):
    class Meta:
        model = Mesa
        fields = (
            'id',
            'numero'
        )

class ProductoSerializar(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = (
            'id',
            'nombre',
            'valor',
        )

