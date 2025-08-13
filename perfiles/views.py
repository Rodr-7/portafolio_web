from django.shortcuts import render

def inicio(request):
    contexto = {
        "year": 2025,  # opcional, lo usamos en el footer del base.html
    }
    return render(request, "perfiles/inicio.html", contexto)
