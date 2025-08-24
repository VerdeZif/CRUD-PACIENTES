import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

type Cita = {
  id: number;
  paciente_id: number;
  fecha: string;
  time: string;
  motivo: string;
};

function CitaEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [cita, setCita] = useState<Cita | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/api/citas/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        setCita(data);
        setLoading(false);
      })
      .catch(console.error);
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (cita) setCita({ ...cita, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cita) return;

    fetch(`http://localhost:8000/api/citas/${id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cita),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Cita actualizada");
        navigate("/citas");
      })
      .catch(console.error);
  };

  if (loading) return <p>Cargando cita...</p>;
  if (!cita) return <p>Cita no encontrada</p>;

  return (
    <main>
      <h1>Editar Cita</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          name="fecha"
          value={cita.fecha}
          onChange={handleChange}
        />
        <input
          type="time"
          name="time"
          value={cita.time}
          onChange={handleChange}
        />
        <input
          type="text"
          name="motivo"
          value={cita.motivo}
          onChange={handleChange}
          placeholder="Motivo"
        />
        <button type="submit">Actualizar</button>
      </form>
    </main>
  );
}

export default CitaEdit;