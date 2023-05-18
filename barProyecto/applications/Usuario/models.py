from django.db import models

from applications.Sede.models import Sede

class TipoEmpleado(models.Model):
    nombre = models.CharField(max_length=20, )

class Empleado(models.Model):
    nombres = models.CharField(max_length=30, )
    apellidos = models.CharField(max_length=30, )
    correo = models.CharField(max_length=30, )
    direccion = models.CharField(max_length=30, )
    telefono = models.IntegerField()
    estado = models.IntegerField()
    tipo_empleado = models.ForeignKey(TipoEmpleado,on_delete=models.CASCADE)
    sede = models.ForeignKey(Sede,on_delete=models.CASCADE)