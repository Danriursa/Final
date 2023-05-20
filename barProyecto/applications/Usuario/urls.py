from django.contrib import admin
from django.urls import path
from . import views

app_name = "departamento_app"

urlpatterns = [
    path(
        'new-usuario/',
        views.UsuarioListView.as_view(),
        name='usuarios'
        ),
]