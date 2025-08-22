# Mini Proyecto: CRUD de Pacientes y Citas

Este proyecto implementa un sistema básico de gestión de **Pacientes y Citas médicas**, utilizando:

- **Backend**: Django + Django REST Framework (API REST)
- **Frontend**: React (Vite + TypeScript)
- **Metodologías**: Scrum + XP
- **Control de versiones**: GitHub + GitHub Actions (CI/CD)

## Historias de Usuario Implementadas

1. Como usuario, quiero **registrar un paciente** con su ID, nombre y apellido para asignarle citas.
2. Como usuario, quiero **agendar una cita** indicando fecha, hora y paciente.
3. Como usuario, quiero **ver la lista de pacientes registrados con sus citas** y que se muestre su número de orden.
4. Como usuario, quiero **editar los datos de un paciente o una cita** para actualizar información o corregir errores.
5. Como usuario, quiero **eliminar una cita** en caso de que el paciente no pueda asistir.

## Estructura del Proyecto

CRUD-PACIENTES/
│
├── backend/ # API con Django REST Framework
│ ├── config/ # Configuración principal de Django
│ ├── core/ # App principal con modelos, views, serializers
│ ├── requirements.txt # Dependencias del backend
│ └── manage.py
│
├── frontend/ # Interfaz con React + Vite + TypeScript
│ └── src/
│ ├── assets/ # Recursos estáticos
│ ├── pages/ # Vistas principales (Pacientes, Citas)
│ ├── api.ts # Conexión a la API (axios/fetch)
│ ├── App.tsx # Componente raíz
│ └── types.ts # Tipos/Interfaces de datos
│
├── .github/workflows/ci.yml # Pipeline de CI con GitHub Actions
└── README.md # Documentación del proyecto

## Instalación y Ejecución

### Backend (Django)
1. Entrar a la carpeta del backend:
    cd backend
2. Crear y activar un entorno virtual:
    python -m venv venv
    source venv/bin/activate   # En Linux/Mac
    venv\Scripts\activate      # En Windows
3. Instalar dependencias:
    pip install -r requirements.txt
4. Ejecutar migraciones:
    python manage.py migrate
5. Levantar el servidor:
    python manage.py runserver
    El backend estará disponible en: http://localhost:8000

### Frontend (React + Vite)
1. Entrar a la carpeta del frontend:
    cd frontend
2. Instalar dependencias:
    npm install
3. Levantar el servidor de desarrollo:
    npm run dev
    El frontend estará disponible en: http://localhost:5173

## Pruebas

### Backend (Django + Pytest)

1. Ejecutar los tests del backend:
    pytest
2. Incluyen pruebas de:
    Creación de pacientes y citas.
    Edición y eliminación de datos.
    Validaciones (campos requeridos, fechas válidas).

### Frontend (React + Jest + RTL)

1. Ejecutar los tests del frontend:
    npm test
2.  Incluyen pruebas de:
    Renderizado de formularios.
    Envío de datos a la API.
    Listado y edición de pacientes/citas.
    Eliminación con confirmación.

## Integración Continua (CI/CD)

El proyecto incluye un workflow de GitHub Actions (.github/workflows/ci.yml) que se ejecuta en cada push/pull request y valida:
Instalación de dependencias.
Ejecución de migraciones y tests en el backend.
Ejecución de tests en el frontend.

## Metodologías

Scrum: Historias de usuario, Sprint Backlog, revisión en un sprint único.
XP (Extreme Programming): TDD (tests automáticos), integración continua, feedback rápido.


---

