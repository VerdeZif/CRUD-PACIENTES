import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function PacienteForm() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const navigate = useNavigate();

  const addPaciente = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/pacientes/", { nombre, apellido });
      setNombre("");
      setApellido("");
      navigate("/"); // redirige al inicio después de agregar
    } catch (err: any) {
      alert("Error al agregar paciente: " + (err.response?.data?.detail || err.message));
      console.error("Error al agregar paciente:", err);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h1>Agregar Paciente</h1>
      <form onSubmit={addPaciente} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          style={{ padding: 8, fontSize: 16 }}
        />
        <input
          type="text"
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          required
          style={{ padding: 8, fontSize: 16 }}
        />
        <button type="submit" style={{ padding: 10, fontSize: 16, cursor: "pointer" }}>
          Agregar
        </button>
      </form>
    </div>
  );
}
