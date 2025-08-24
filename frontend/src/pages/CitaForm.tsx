import React, { useEffect, useState } from "react";
import api from "../api";

interface Paciente {
  id: number;
  nombre: string;
  apellido: string;
}

const CitaForm: React.FC = () => {
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [pacienteId, setPacienteId] = useState("");
  const [error, setError] = useState("");
  const [pacientes, setPacientes] = useState<Paciente[]>([]);

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const res = await api.get("/pacientes/");
        setPacientes(res.data);
      } catch (err) {
        console.error("Error al cargar pacientes", err);
      }
    };
    fetchPacientes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!fecha || !hora || !pacienteId) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      const response = await api.post("/citas/", {
        fecha,
        hora,
        paciente_id: pacienteId,
      });

      if (response.status === 201) {
        alert("✅ Cita creada exitosamente");
        setFecha("");
        setHora("");
        setPacienteId("");
      }
    } catch (err) {
      console.error(err);
      setError("❌ Error al crear la cita");
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
          Registrar Nueva Cita
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
            onChange={(e) => setPacienteId(e.target.value)}
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

export default CitaForm;

