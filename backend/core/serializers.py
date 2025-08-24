from rest_framework import serializers
from django.utils import timezone
from .models import Paciente, Cita

# 1. Primero definimos CitaSerializer sin usar PacienteSerializer aún
class CitaSerializer(serializers.ModelSerializer):
    paciente = serializers.StringRelatedField(read_only=True)
    paciente_id = serializers.PrimaryKeyRelatedField(
        queryset=Paciente.objects.all(),
        source="paciente",
        write_only=True
    )

    class Meta:
        model = Cita
        fields = ['id', 'fecha', 'hora', 'paciente', 'paciente_id']

    def validate(self, data):
        if data["fecha"] < timezone.now().date():
            raise serializers.ValidationError({"fecha": "La fecha no puede estar en el pasado"})
        return data

# 2. Luego definimos PacienteSerializer, que SÍ puede usar CitaSerializer ahora
class PacienteSerializer(serializers.ModelSerializer):
    citas = CitaSerializer(many=True, read_only=True)

    class Meta:
        model = Paciente
        fields = ['id', 'nombre', 'apellido', 'citas']
