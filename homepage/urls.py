from django.urls import path
from . import views

urlpatterns = [
    path('', views.inicio, name='inicio'),  # Página principal
    path("perfil/", views.perfil, name="perfil"),
    path("perfil2/", views.perfil2, name="perfil2"),

]
