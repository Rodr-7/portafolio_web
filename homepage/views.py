from django.shortcuts import render

# Create your views here.
def inicio(request):
    contexto = {
        "year": 2025,  # opcional, lo usamos en el footer del base.html
    }
    return render(request, "homepage/inicio.html", contexto)

def perfil(request):
    return render(request, "homepage/perfil.html")

def perfil2(request):
    return render(request, "homepage/perfil2.html")