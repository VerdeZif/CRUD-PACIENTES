import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";

interface Paciente {
  id: number;
  nombre: string;
  apellido: string;
}

const CitaEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [pacienteId, setPacienteId] = useState<number | "">("");
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    // Cargar la cita
    api.get(`/citas/${id}/`)
      .then((res) => {
        setFecha(res.data.fecha);
        setHora(res.data.hora);
        setPacienteId(res.data.paciente.id);
      })
      .catch(() => setError("❌ Error al cargar la cita"));

    // Cargar los pacientes
    api.get("/pacientes/")
      .then((res) => setPacientes(res.data))
      .catch(() => setError("❌ Error al cargar pacientes"));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!fecha || !hora || !pacienteId) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      const res = await api.put(`/citas/${id}/`, {
        fecha,
        hora,
        paciente_id: pacienteId,
      });

      if (res.status === 200) {
        alert("✅ Cita actualizada correctamente");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      setError("❌ Error al actualizar la cita");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "400px",
          width: "100%",
          backgroundColor: "#e2dedeff",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "15px" }}>
          Editar Cita
        </h2>

        <label htmlFor="fecha">
          Fecha:
          <input
            type="date"
            id="fecha"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </label>

        <label htmlFor="hora">
          Hora:
          <input
            type="time"
            id="hora"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </label>

        <label htmlFor="paciente">
          Paciente:
          <select
            id="paciente"
            value={pacienteId}
            onChange={(e) => setPacienteId(Number(e.target.value))}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          >
            <option value="">Seleccione un paciente</option>
            {pacientes.map((pac) => (
              <option key={pac.id} value={pac.id}>
                {pac.nombre} {pac.apellido}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          style={{
            padding: "10px 15px",
            cursor: "pointer",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontWeight: "bold",
            fontSize: "16px",
            marginTop: "10px",
          }}
        >
          Guardar Cita
        </button>

        {error && (
          <p
            style={{
              marginTop: "10px",
              fontWeight: "bold",
              color: error.includes("✅") ? "green" : "red",
              textAlign: "center",
            }}
          >
            {error}
          </p>
        )}
      </form>
    </div>
  );
};

export default CitaEdit;
