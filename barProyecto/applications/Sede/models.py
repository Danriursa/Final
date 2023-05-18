from django.db import models

# Create your models here.

class Mesa(models.Model):
    numero = models.SmallIntegerField()

class Producto(models.Model):
    nombre = models.CharField(max_length=25)
    valor = models.DecimalField(max_digits=10, decimal_places=0)


class Sede(models.Model):
    nombre = models.CharField(max_length=30)
    direccion = models.CharField(max_length=30)
    telefono = models.IntegerField()

class ProdutoSede(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    sede = models.ForeignKey(Sede, on_delete=models.CASCADE)
    cantidad = models.IntegerField()