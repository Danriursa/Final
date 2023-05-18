from django.db import models
from applications.Sede.models import Producto

class Proveedor(models.Model):
    nombres = models.CharField(max_length=30)
    apellidos = models.CharField(max_length=30)
    correo = models.CharField(max_length=30)
    direccion = models.CharField(max_length=40)
    telefono = models.IntegerField()

class ProveedorProducto(models.Model):
    precio_compra = models.DecimalField(max_digits=10, decimal_places=0)
    proveedor_id = models.ForeignKey(Proveedor, on_delete=models.CASCADE)
    producto_id = models.ForeignKey(Producto, on_delete=models.CASCADE)

class Precio(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    proveedor_id = models.ForeignKey(Proveedor, on_delete=models.CASCADE)
    precio_venta = models.DecimalField(max_digits=15, decimal_places=0)
    precio_compra = models.DecimalField(max_digits=15, decimal_places=0)
    fecha_inicio = models.DateTimeField()
    fecha_final = models.DateTimeField()
