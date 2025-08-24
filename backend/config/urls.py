from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from core.views import PacienteViewSet, CitaViewSet

# Creamos el router
router = DefaultRouter()
router.register(r'pacientes', PacienteViewSet, basename='paciente')
router.register(r'citas', CitaViewSet, basename='cita')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),  # Aquí se exponen todos los endpoints /api/pacientes/, etc.
]
