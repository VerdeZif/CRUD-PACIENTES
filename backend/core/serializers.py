from rest_framework import serializers
from django.utils import timezone
from .models import Paciente, Cita

class PacienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paciente
        fields = ['id', 'nombre', 'apellido']


class CitaSerializer(serializers.ModelSerializer):
    # Mostrar los datos del paciente (anidado)
    paciente = PacienteSerializer(read_only=True)
    # Para crear citas indicando el id del paciente
    paciente_id = serializers.PrimaryKeyRelatedField(
        queryset=Paciente.objects.all(),
        source="paciente",
        write_only=True
    )

    class Meta:
        model = Cita
        fields = ['id', 'fecha', 'hora', 'paciente', 'paciente_id']

    def validate(self, data):
        # Validación extra: no permitir citas en el pasado
        if data["fecha"] < timezone.now().date():
            raise serializers.ValidationError({"fecha": "La fecha no puede estar en el pasado"})
        return data