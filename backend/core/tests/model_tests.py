
import pytest
from django.utils import timezone
from django.core.exceptions import ValidationError
from datetime import time, timedelta
from core.models import Paciente ,Cita

#Part1 test para paciente
@pytest.mark.django_db
def test_crear_paciente_valido():
    paciente = Paciente(nombre="Juan", apellido="Pérez")
    paciente.full_clean()  # valida según clean() y validators
    paciente.save()
    assert str(paciente) == "Juan Pérez"

@pytest.mark.django_db
def test_nombre_no_puede_estar_vacio():
    paciente = Paciente(nombre="   ", apellido="Pérez")
    with pytest.raises(ValidationError):
        paciente.full_clean()

@pytest.mark.django_db
def test_apellido_no_puede_estar_vacio():
    paciente = Paciente(nombre="Juan", apellido="   ")
    with pytest.raises(ValidationError):
        paciente.full_clean()

@pytest.mark.django_db
def test_nombre_y_apellido_no_pueden_ser_iguales():
    paciente = Paciente(nombre="Juan", apellido="Juan")
    with pytest.raises(ValidationError):
        paciente.full_clean()

@pytest.mark.django_db
def test_nombre_no_puede_tener_numeros():
    paciente = Paciente(nombre="Juan123", apellido="Pérez")
    with pytest.raises(ValidationError):
        paciente.full_clean()

#Part2 test para cita
@pytest.mark.django_db
def test_crear_cita_con_paciente_valido():
    paciente = Paciente.objects.create(nombre="Juan", apellido="Perez")
    cita = Cita.objects.create(
        paciente=paciente,
        fecha=timezone.now().date() + timedelta(days=1),
        hora=time(10, 0)
    )
    assert cita.paciente == paciente
    assert str(cita) == f"Cita de {paciente} el {cita.fecha} a las {cita.hora}"

@pytest.mark.django_db
def test_no_permite_cita_sin_paciente():
    from django.db.utils import IntegrityError
    with pytest.raises(IntegrityError):
        Cita.objects.create(
            paciente=None,
            fecha=timezone.now().date() + timedelta(days=1),
            hora=time(10, 0)
        )

@pytest.mark.django_db
def test_eliminar_paciente_elimina_citas():
    paciente = Paciente.objects.create(nombre="Maria", apellido="Lopez")
    cita = Cita.objects.create(
        paciente=paciente,
        fecha=timezone.now().date() + timedelta(days=2),
        hora=time(11, 0)
    )
    assert Cita.objects.count() == 1
    paciente.delete()
    assert Cita.objects.count() == 0  # cascade delete

@pytest.mark.django_db
def test_no_permite_fecha_pasada():
    paciente = Paciente.objects.create(nombre="Carlos", apellido="Ruiz")
    cita = Cita(
        paciente=paciente,
        fecha=timezone.now().date() - timedelta(days=1),
        hora=time(9, 0)
    )
    with pytest.raises(ValidationError) as e:
        cita.clean()
    assert "fecha" in e.value.message_dict


