import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

type Paciente = {
  id: number;
  name: string;
  lastname: string;
  fecha: string;
  time: string;
  paciente: string;
};

function PacienteEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/api/pacientes/${id}/`)
      .then((res) => res.json()) //
      .then((data) => {
        setPaciente(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);     
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (paciente) setPaciente({ ...paciente, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paciente) return;

    fetch(`http://localhost:8000/api/pacientes/${id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paciente),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Paciente actualizado");
        navigate("/"); // vuelve a la lista
      })
      .catch(console.error);
  };

  if (loading) return <p>Cargando paciente...</p>;
  if (!paciente) return <p>Paciente no encontrado</p>;

  return (
    <main>
      <h1>Editar Paciente</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={paciente.name}
          onChange={handleChange}
          placeholder="Nombre"  
        />
        <input
          type="text"
          name="lastname"
          value={paciente.lastname}
          onChange={handleChange}
          placeholder="Apellido"
        />
        <input
          type="date"
          name="fecha"
          value={paciente.fecha}
          onChange={handleChange}
        />
        <input
          type="time"
          name="time"
          value={paciente.time}
          onChange={handleChange}
        />
        <input
          type="text"
          name="paciente"
          value={paciente.paciente}
          onChange={handleChange}
          placeholder="Tipo de paciente"
        />
        <button type="submit">Actualizar</button>
      </form>
    </main>
  );
}

export default PacienteEdit;