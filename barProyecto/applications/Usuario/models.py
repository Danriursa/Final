from django.db import models

from applications.Sede.models import Sede

class TipoEmpleado(models.Model):
    nombre = models.CharField(max_length=20, )

class Empleado(models.Model):
    nombre = models.CharField(max_length=30, )
    apellido = models.CharField(max_length=30, )
    correo = models.CharField(max_length=30, )
    clave = models.CharField(max_length=30,)
    direccion = models.CharField(max_length=30, )
    telefono = models.IntegerField()
    estado = models.IntegerField()
    tipo_empleado_id = models.ForeignKey(TipoEmpleado,on_delete=models.CASCADE)
    sede_id = models.ForeignKey(Sede,on_delete=models.CASCADE)