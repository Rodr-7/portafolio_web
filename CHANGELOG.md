# 25-08-25

## Implementación de login + registro en la página de inicio

Se añadió autenticación de usuarios (login/logout) y **registro** (signup) usando componentes estándar de Django, integrados a tu `inicio.html` mediante un **modal de Bootstrap con pestañas** (Iniciar sesión / Crear cuenta), sin alterar el contenido original de la página. Los enlaces “Ir al perfil” se mantienen intactos; cuando el usuario no está autenticado, el click abre el modal y, una vez autenticado, se respeta la redirección usando `next`.

---

### 1) Rutas de autenticación (login / logout)

Se agregaron rutas en el archivo de URLs del proyecto (por ejemplo `config/urls.py` o `portafolio_web/urls.py`):

```python
from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('homepage.urls')),  # tus rutas de app

    # Autenticación
    path('accounts/login/',  auth_views.LoginView.as_view(),  name='login'),
    path('accounts/logout/', auth_views.LogoutView.as_view(), name='logout'),
]

```

### 2) Ajustes de autenticación en settings

Se declararon (opcional pero recomendado) en `settings.py`:

```python
LOGIN_URL = 'login'
LOGIN_REDIRECT_URL = '/'
LOGOUT_REDIRECT_URL = '/'

```

### 3) URL y vista de **signup** en la app

Se creó la ruta de registro en `homepage/urls.py`:

```python
from django.urls import path
from . import views

urlpatterns = [
    path('', views.inicio, name='inicio'),  # tu vista de inicio
    path('signup/', views.signup_view, name='signup'),
]

```

Se implementó la vista de registro en `homepage/views.py` usando `UserCreationForm` y login automático tras crear el usuario:

```python
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login

def signup_view(request):
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            next_url = request.POST.get("next") or "/"
            return redirect(next_url)
    else:
        form = UserCreationForm()
    # Nota: se reusa el inicio para mostrar errores del form en el modal
    return render(request, "registration/signup_proxy.html", {"signup_form": form})

```

Se añadió un **proxy template** mínimo (`templates/registration/signup_proxy.html`) para volver a renderizar el inicio y que el modal muestre los errores de `signup_form`:

```
{% extends "perfiles/base.html" %}
{% block content %}
  {% include "homepage/inicio.html" %}
{% endblock %}

```

> Puedes adaptar extends/include a tu estructura real de plantillas.
> 

### 4) Integración del login/registro en `inicio.html` (sin alterar lo original)

- Se mantuvieron **tus comentarios y enlaces** intactos.
- Se añadió un **banner** arriba de las tarjetas:
    - Si el usuario está autenticado: muestra usuario y botón “Cerrar sesión”.
    - Si no: muestra botones “Iniciar sesión” y “Registrarse”.
- Se añadió un **modal Bootstrap** con **pestañas**:
    - **Pestaña Login**: formulario `POST` a `{% url 'login' %}`, con campo oculto `next`.
    - **Pestaña Registro**: formulario `POST` a `{% url 'signup' %}`.
- Se añadió un **script** que:
    - Si el usuario **no** está autenticado, intercepta los clics a “Ir al perfil”, abre el modal y setea `next` con el `href` del enlace.
    - El botón “Registrarse” del banner abre la **pestaña de registro** del mismo modal.

> Todo lo nuevo va comentado como [LOGIN] o [SIGNUP] en inicio.html.
> 

### 5) Protección (opcional) de vistas de perfil

Si se requiere que las vistas de perfil **siempre** exijan sesión, se recomendó:

```python
from django.contrib.auth.decorators import login_required

@login_required
def perfil(request):
    ...

```

### 6) Migraciones de base de datos

Para crear las tablas del sistema de autenticación (incluida `auth_user`), se ejecutó:

```bash
python manage.py makemigrations
python manage.py migrate

```

Y se creó un superusuario para pruebas:

```bash
python manage.py createsuperuser

```

### 7) Pruebas funcionales

- Con usuario **no autenticado**:
    - Clic en “Ir al perfil” → se abre el modal de login.
    - Tras login/registro exitoso → redirige a la URL capturada en `next` (el perfil).
- Con usuario **autenticado**:
    - El banner muestra el nombre del usuario y el botón “Cerrar sesión”.
    - “Ir al perfil” navega directo.
- Logout funcional desde el banner.

### 8) Limpieza y pequeños ajustes de plantilla

- Comillas en `src` de imágenes estáticas:
    
    `src="{% static 'homepage/img/no-photo.webp' %}"`.
    
- Filtro `default` con literal entre comillas:
    
    `{{ year|default:"2025" }}`.
    
- Único bloque `{% if user.is_authenticated %} … {% else %} … {% endif %}` para el banner (evitar duplicados).

---

## Recomendaciones futuras (opcional)

- Formulario de registro **personalizado** (añadir email, nombres, etc.).
- **Validación de contraseñas** más amistosa con mensajes en el modal.
- Flujo de **verificación de email** (enviar mail de activación).
- **Reset de contraseña** (URLs y vistas built-in de Django).
- Mensajería (`django.contrib.messages`) en modales tras acciones (login/logout/signup).
- **Pruebas unitarias** para el flujo `next` y protección con `@login_required`.

---

## Errores encontrados y soluciones

1. **`TemplateSyntaxError: Invalid block tag 'else', expected 'endblock'`**
    
    **Causa:** Banner duplicado con un `else` sin `if` abierto.
    
    **Solución:** Dejar **un solo** bloque `{% if user.is_authenticated %} … {% else %} … {% endif %}`.
    
2. **`TemplateSyntaxError` por `{{ year|default:2025 }}`**
    
    **Causa:** Filtro `default` con literal sin comillas.
    
    **Solución:** `{{ year|default:"2025" }}`.
    
3. **HTML inválido en imágenes estáticas**
    
    **Causa:** Falta de comillas en `src` con `{% static %}`.
    
    **Solución:** `src="{% static '...' %}"`.
    
4. **`OperationalError: no such table: auth_user`**
    
    **Causa:** Migraciones no aplicadas.
    
    **Solución:** `python manage.py makemigrations && python manage.py migrate`.
    

---

# 12-08-25

---

## 1) Conectar la app al enrutamiento del proyecto

### 1.1 Crear `perfiles/urls.py`

Motivo: que la app gestione sus propias rutas (buenas prácticas y modularidad).

```python
# perfiles/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.inicio, name='inicio'),  # ruta raíz de la app
]
```

### 1.2 Incluir las rutas de la app en el `urls.py` del proyecto

Motivo: decirle al proyecto que delegue la raíz del sitio a la app `perfiles`.

```python
# mi_proyecto/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('perfiles.urls')),  # delega a la app
]
```

**Resultado:** Al entrar a `http://127.0.0.1:8000/`, Django busca en `perfiles/urls.py`.

---

## 2) Crear la vista inicial y probar rápido

### 2.1 Vista inicial con `HttpResponse`

Motivo: validar routing lo más rápido posible.

```python
# perfiles/views.py (versión inicial)
from django.http import HttpResponse

def inicio(request):
    return HttpResponse("<h1>Bienvenido</h1><p>Este será el inicio de los perfiles.</p>")

```

**Prueba:** `python manage.py runserver` → `http://127.0.0.1:8000/`.

---

## 3) Pasar a templates con `render()`

### 3.1 Configurar la búsqueda de templates

Motivo: permitir templates a nivel proyecto y app.

En `settings.py`, en `TEMPLATES`, dejamos:

- `APP_DIRS=True` (para buscar en `perfiles/templates/`).
- (Opcional) `DIRS: [BASE_DIR / 'templates']` si quieres carpeta global.

```python
# settings.py (fragmento relevante)
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],  # opcional; puedes dejarlo vacío si no lo usas
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

```

### 3.2 Estructura de carpetas de templates (a nivel app)

Motivo: aislamiento por app, evita colisiones de nombres.

```
perfiles/
└── templates/
    └── perfiles/
        ├── base.html
        └── inicio.html

```

### 3.3 Crear `base.html` con bloques

Motivo: layout común + bloques `{% block %}` para que otras páginas lo extiendan.

```html
<!-- perfiles/templates/perfiles/base.html -->
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{% block title %}Perfiles{% endblock %}</title>
    <style>
      body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; margin: 0; }
      header, footer { padding: 1rem; background: #f5f5f5; }
      main { padding: 1.25rem; max-width: 920px; margin: auto; }
      a { text-decoration: none; color: #0b74da; }
      nav a { margin-right: 0.75rem; }
    </style>
  </head>
  <body>
    <header>
      <strong>Mi sitio de perfiles</strong>
      <nav style="float: right">
        <a href="{% url 'inicio' %}">Inicio</a>
        <!-- luego agregaremos enlaces a cada perfil -->
      </nav>
    </header>
    <main>
      {% block content %}{% endblock %}
    </main>
    <footer>
      <small>© {{ year|default:2025 }} • Demo Django</small>
    </footer>
  </body>
</html>

```

### 3.4 Crear `inicio.html` extendiendo `base.html`

Motivo: reutilizar layout y colocar el contenido de la portada.

```
{# perfiles/templates/perfiles/inicio.html #}
{% extends "perfiles/base.html" %}

{% block title %}Inicio — Perfiles{% endblock %}

{% block content %}
  <h1>Bienvenido</h1>
  <p>Este será el inicio de los perfiles.</p>

  <section>
    <h2>Personas</h2>
    <ul>
      <li><a href="#">Perfil de Persona 1</a></li>
      <li><a href="#">Perfil de Persona 2</a></li>
    </ul>
  </section>
{% endblock %}

```

### 3.5 Actualizar la vista para usar `render()`

Motivo: renderizar la plantilla con contexto.

```python
# perfiles/views.py (versión actual)
from django.shortcuts import render

def inicio(request):
    contexto = {"year": 2025}  # ejemplo para el footer
    return render(request, "perfiles/inicio.html", contexto)

```

**Prueba:** `python manage.py runserver` → `http://127.0.0.1:8000/`.

---

## 4) Errores que aparecieron y cómo los resolvimos

### 4.1 `TemplateSyntaxError: Unclosed tag 'block'`

**Causa:** un bloque `{% block ... %}` abierto sin su `{% endblock %}` correspondiente o etiquetas de bloque partidas en varias líneas de forma extraña.

**Solución:** asegurar que cada `{% block ... %}` tenga su `{% endblock %}` y que las etiquetas `{% ... %}` no queden partidas. Pusimos cada bloque en su propia línea.

---

### 4.2 Conflicto con **Prettier** formateando templates Django

**Síntomas:**

- Prettier reacomodaba las etiquetas de bloque y rompía el HTML de Django.
- Luego, al añadir `{% comment %} prettier-ignore {% endcomment %}`, Django arrojó:
    
    > {% extends "..." %} must be the first tag in 'template.html'.
    > 

**Causas y reglas clave en Django:**

- `extends` **debe ser literalmente la primera instrucción del archivo**, sin **ningún** comentario, espacio o salto antes (ni siquiera comentarios de Django).

**Soluciones:**

1. Dejar `extends` como **línea 1** y, si quieres ignorar Prettier, usar **comentarios HTML** después, por ejemplo:
    
    ```
    {% extends "perfiles/base.html" %}
    <!-- prettier-ignore-start -->
    {% block title %}Inicio — Perfiles{% endblock %}
    {% block content %} ... {% endblock %}
    <!-- prettier-ignore-end -->
    
    ```
    
2. Instalar un plugin para que Prettier entienda los templates de Django:
    
    ```bash
    npm install --save-dev prettier-plugin-django
    
    ```
    
    y en `.prettierrc`:
    
    ```json
    { "plugins": ["prettier-plugin-django"] }
    
    ```
    

---

## 5) Flujo mental del request (mini-diagrama)

1. **Navegador** → `GET /`
2. **Proyecto** (`mi_proyecto/urls.py`) → `path('', include('perfiles.urls'))`
3. **App** (`perfiles/urls.py`) → `path('', views.inicio, name='inicio')`
4. **Vista** (`perfiles/views.py`) → `render(request, "perfiles/inicio.html", contexto)`
5. **Template** `inicio.html` → `{% extends "perfiles/base.html" %}` + `{% block content %}...{% endblock %}`
6. **Respuesta HTML** → navegador

---

## 6) Estado final recomendado de archivos (resumen)

**`mi_proyecto/urls.py`**

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('perfiles.urls')),
]

```

**`perfiles/urls.py`**

```python
from django.urls import path
from . import views

urlpatterns = [
    path('', views.inicio, name='inicio'),
]

```

**`perfiles/views.py`**

```python
from django.shortcuts import render

def inicio(request):
    return render(request, "perfiles/inicio.html", {"year": 2025})

```

**`perfiles/templates/perfiles/base.html`**

(igual al que pegaste)

**`perfiles/templates/perfiles/inicio.html`**

```
{% extends "perfiles/base.html" %}

{% block title %}Inicio — Perfiles{% endblock %}

{% block content %}
  <h1>Bienvenido</h1>
  <p>Este será el inicio de los perfiles.</p>
  <section>
    <h2>Personas</h2>
    <ul>
      <li><a href="#">Perfil de Persona 1</a></li>
      <li><a href="#">Perfil de Persona 2</a></li>
    </ul>
  </section>
{% endblock %}

```

---

## 7) Resumen

- [ ]  `perfiles` está en `INSTALLED_APPS` de `settings.py`.
- [ ]  `APP_DIRS=True` en `TEMPLATES`.
- [ ]  Carpeta: `perfiles/templates/perfiles/`.
- [ ]  `extends` es **la primera línea** en `inicio.html`.
- [ ]  Todos los `{% block %}` tienen su `{% endblock %}`.
- [ ]  `mi_proyecto/urls.py` incluye `include('perfiles.urls')`.
- [ ]  Servidor corre y ves la portada en `http://127.0.0.1:8000/`.

---