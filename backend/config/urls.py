from django.contrib import admin
from django.urls import path
from core.views import PacienteListCreateView, CitaListCreateView, CitaDetailView

urlpatterns = [
    path("admin/", admin.site.urls),

    # Endpoints para Paciente
    path("api/pacientes/", PacienteListCreateView.as_view(), name="paciente-list-create"),

    # Endpoints para Cita
    path("api/citas/", CitaListCreateView.as_view(), name="cita-list-create"),
    path("api/citas/<int:pk>/", CitaDetailView.as_view(), name="cita-detail"),
]