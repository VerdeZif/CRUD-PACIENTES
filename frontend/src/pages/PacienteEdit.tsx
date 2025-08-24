import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";

function PacienteEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    api.get(`/pacientes/${id}/`)
      .then(res => {
        setNombre(res.data.nombre);
        setApellido(res.data.apellido);
      })
      .catch(() => setError("Error al cargar paciente"));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await api.put(`/pacientes/${id}/`, { nombre, apellido });
      alert("Paciente actualizado");
      navigate("/"); // redirige al inicio después de actualizar
    } catch (err) {
      setError("Error al actualizar paciente");
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto", padding: "20px", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Editar Paciente</h2>

      {error && (
        <p style={{ color: "red", marginBottom: "15px", textAlign: "center" }}>{error}</p>
      )}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <input
          type="text"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          placeholder="Nombre"
          required
          style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        <input
          type="text"
          value={apellido}
          onChange={e => setApellido(e.target.value)}
          placeholder="Apellido"
          required
          style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        <button type="submit" style={{ padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Actualizar
        </button>
      </form>
    </div>
  );
}

export default PacienteEdit;
