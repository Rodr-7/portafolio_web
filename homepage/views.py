from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login
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

def perfil3(request):
    return render(request, "homepage/perfil3.html")

def signup_view(request):
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)  # inicia sesión tras registrarse
            next_url = request.POST.get("next") or "/"
            return redirect(next_url)
    else:
        form = UserCreationForm()

    # Importante: pasar signup_form al template (el modal lo usa si hay errores)
    return render(request, "registration/signup_proxy.html", {"signup_form": form})