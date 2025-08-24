from rest_framework import viewsets
from .models import Paciente, Cita
from .serializers import PacienteSerializer, CitaSerializer

# ViewSet para Paciente con CRUD completo
class PacienteViewSet(viewsets.ModelViewSet):
    queryset = Paciente.objects.all()
    serializer_class = PacienteSerializer

# ViewSet para Cita con CRUD completo
class CitaViewSet(viewsets.ModelViewSet):
    queryset = Cita.objects.all()
    serializer_class = CitaSerializer