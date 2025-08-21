from django.db import models

# ---------------------------
# MODELO PACIENTE
# ---------------------------
class Paciente(models.Model):
    id = models.AutoField(primary_key=True)  # Se crea automáticamente, pero lo ponemos explícito
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.nombre} {self.apellido}"


# ---------------------------
# MODELO CITA
# ---------------------------
class Cita(models.Model):
    id = models.AutoField(primary_key=True)  # opcional, Django lo añade por defecto
    fecha = models.DateField()
    hora = models.TimeField()
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE, related_name="citas")

    def __str__(self):
        return f"Cita de {self.paciente} el {self.fecha} a las {self.hora}"
