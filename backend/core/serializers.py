from rest_framework import serializers
from .models import Paciente, Cita

class PacienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paciente
        fields = "__all__"

class CitaSerializer(serializers.ModelSerializer):
    paciente = PacienteSerializer(read_only=True)
    paciente_id = serializers.PrimaryKeyRelatedField(
        queryset=Paciente.objects.all(), source="paciente", write_only=True
    )

    class Meta:
        model = Cita
        fields = ["id", "fecha", "hora", "paciente", "paciente_id"]
