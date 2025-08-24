from django.db import models
from django.core.validators import RegexValidator
from django.core.exceptions import ValidationError
from django.utils import timezone

# ---------------------------
# MODELO PACIENTE
# ---------------------------
class Paciente(models.Model):
    id = models.AutoField(primary_key=True)  # Se crea automáticamente, pero lo ponemos explícito
    nombre = models.CharField(max_length=100,
                            validators=[
                                RegexValidator(
                                    regex=r'^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$',
                                    message="El nombre solo puede contener letras y espacios"
                                )
                            ]
                        )
    apellido = models.CharField(max_length=100,
                            validators=[
                                RegexValidator(
                                    regex=r'^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$',
                                    message="El apellido solo puede contener letras y espacios"
                                )
                            ]
                        )
    def clean(self):
        if not self.nombre.strip():
            raise ValidationError({"nombre": "El nombre no puede estar vacío o solo con espacios"})
        if not self.apellido.strip():
            raise ValidationError({"apellido": "El apellido no puede estar vacío o solo con espacios"})
        
        if self.nombre.lower() == self.apellido.lower():
            raise ValidationError("El nombre y apellido no pueden ser iguales")

    def __str__(self):
        return f"{self.nombre} {self.apellido}"
        

# ---------------------------
# MODELO CITA
# ---------------------------
class Cita(models.Model):
    id = models.AutoField(primary_key=True)  # opcional, Django lo añade por defecto
    fecha = models.DateField()
    hora = models.TimeField()
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE, related_name="citas", null=False, blank=False)

    def clean(self):
        # ejemplo: validar que la fecha no sea en el pasado
        if self.fecha < timezone.now().date():
            raise ValidationError({"fecha": "La fecha no puede estar en el pasado"})

    def __str__(self):
        return f"Cita de {self.paciente} el {self.fecha} a las {self.hora}"
