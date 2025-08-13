# **Portafolio Web**

Web App que muestra perfiles profesionales de desarrolladores con un toque personal.
Consta de una pantalla principal diseñada teniendo en mente la escalabilidad y la reformulación de funciones de la aplicación (se contempla extender su utilidad mas allá). 
Mostrará información variada, un login de usuarios y enlaces a las páginas de perfil profesional.

---

## 📌 Características
- Página principal con diseño escalable y adaptable a múltiples propósitos (inicialmente servirá de login para dar acceso a los perfiles).
- Sistema de autenticación de usuarios (login y registro).
- Perfiles profesionales con información personalizada.
- Enlaces directos a redes profesionales (GitHub, LinkedIn, etc.).
- Preparado para escalar y añadir nuevas funciones.

---

## 🛠️ Tecnologías utilizadas

- Python 3.x**
- Django 4.x**
- HTML5, CSS3 y JavaScript
- Base de datos SQLite (por defecto en desarrollo)

---

## 📂 Estructura del proyecto

```bash
portafolio/
│
├── manage.py
├── portafolio/           # Configuración principal del proyecto
├── perfiles/             # App principal que maneja los perfiles
├── static/               # Archivos estáticos (CSS, JS, imágenes)
├── templates/            # Plantillas HTML
└── requirements.txt      # Dependencias del proyecto
```

---

## 🚀 Instalación y ejecución

1. **Clonar el repositorio**
    
    ```bash
    git clone https://github.com/usuario/portafolio-django.git
    cd portafolio-django
    ```
    
2. **Crear y activar un entorno virtual**
    
    ```bash
    python -m venv venv
    source venv/bin/activate    # En Linux/Mac
    venv\Scripts\activate       # En Windows
    ```
    
3. **Instalar dependencias**
    
    ```bash
    pip install -r requirements.txt
    ```
    
4. **Aplicar migraciones**
    
    ```bash
    python manage.py migrate
    ```
    
5. **Ejecutar servidor**
    
    ```bash
    python manage.py runserver
    ```
    
6. **Abrir en el navegador**
    
    ```
    http://127.0.0.1:8000
    ```
    

---

## 🔑 Usuarios de prueba

Si el proyecto incluye datos iniciales:

```bash
python manage.py loaddata datos_prueba.json
```

Usuario admin:

```
Usuario: admin
Contraseña: admin123
```

---

## 📦 Despliegue

Para desplegar en un servidor o servicio como **PythonAnywhere**, **Heroku** o **Railway**:

1. Configurar `ALLOWED_HOSTS` en `settings.py`.
2. Cambiar a una base de datos de producción (PostgreSQL recomendado).
3. Configurar archivos estáticos con `collectstatic`.
4. Usar un servidor WSGI como Gunicorn.

---

## 📜 Licencia

Este proyecto está bajo la licencia MIT.

Consulta el archivo LICENSE para más información.

---

## 👨‍💻 Autores

**Tu Nombre**

[GitHub](https://github.com/tuusuario) | [LinkedIn](https://www.linkedin.com/in/tuusuario/)