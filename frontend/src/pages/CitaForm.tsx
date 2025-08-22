import React, { useEffect, useState } from "react";
import axios from "axios";

const CitaForm: React.FC = () => {
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [pacienteId, setPacienteId] = useState("");
    const [error, setError] = useState("");
    
    
    const handleSubmit = (e: React.FormEvent) => { 
        //salen mensaje de error si no se completan los campos
        setError("");
        e.preventDefault();    
        if (!fecha || !hora || !pacienteId) {
            setError("Todos los campos son obligatorios");
            return;
        }
        try { 
            const response = axios.post("http://127.0.0.1:8000/citas/", {
        fecha,
        hora,
        paciente_id: pacienteId,
      });
      
      if (response.status === 201) {
        alert("Cita creada exitosamente");
        setFecha("");
        setHora("");
        setPacienteId(null);
      }
    }
        catch (error) {
            setError("Error al crear la cita");
        }

    };
    return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Registrar Nueva Cita</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="fecha">Fecha:</label>
          <input
            type="date"
            id="fecha"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="hora">Hora:</label>
          <input
            type="time"
            id="hora"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="paciente">ID del Paciente:</label>
          <input
            type="number"
            id="paciente"
            value={pacienteId}
            onChange={(e) => setPacienteId(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <button type="submit" style={{ padding: "10px 15px", cursor: "pointer" }}>
          Guardar Cita
        </button>
      </form>

      {error && (
        <p style={{ marginTop: "15px", fontWeight: "bold", color: error.includes("✅") ? "green" : "red" }}>
          {error}
        </p>
      )}
    </div>
  );
};
export default CitaForm;