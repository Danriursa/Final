from django.shortcuts import render

from django.views.generic.edit import FormView
from django.views.generic import ListView

from .models import Empleado

class UsuarioListView(ListView):
    template_name = "usuarios/lista.html"
    ordering='nombre'
    paginate_by=6
    context_object_name ='empleados'
    def get_queryset(self):
        palabra_clave= self.request.GET.get("kword",'')
        lista=Empleado.objects.filter(
            nombre__icontains=palabra_clave
        )
        return lista