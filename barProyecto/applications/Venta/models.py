from django.db import models

from applications.Sede.models import Mesa,Sede,Producto

class Venta(models.Model):
    fecha = models.DateTimeField()
    mesa_id = models.ForeignKey(Mesa,on_delete=models.CASCADE)
    sede_id = models.ForeignKey(Sede,on_delete=models.CASCADE)
    estado = models.SmallIntegerField()

class VentaProducto(models.Model):
    venta_id = models.ForeignKey(Venta,on_delete=models.CASCADE)
    producto_id = models.ForeignKey(Producto,on_delete=models.CASCADE)
    cantidad = models.IntegerField()
