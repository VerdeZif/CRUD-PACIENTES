import { useEffect, useState } from "react";
import api from "../api"; // este es el axios con baseURL desde .env

interface Paciente {
  id: number;
  nombre: string;
  apellido: string;
}

export default function PacientesPage() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");

  // 📌 Cargar lista de pacientes al inicio
  useEffect(() => {
    fetchPacientes();
  }, []);

  const fetchPacientes = async () => {
    try {
      const res = await api.get("/pacientes/");
      setPacientes(res.data);
    } catch (err) {
      console.error("Error al obtener pacientes:", err);
    }
  };

  const addPaciente = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/pacientes/", { nombre, apellido });
      setNombre("");
      setApellido("");
      fetchPacientes();
    } catch (err) {
      console.error("Error al agregar paciente:", err);
    }
  };

  const deletePaciente = async (id: number) => {
    try {
      await api.delete(`/pacientes/${id}/`);
      fetchPacientes();
    } catch (err) {
      console.error("Error al eliminar paciente:", err);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Gestión de Pacientes</h1>

      {/* Formulario agregar paciente */}
      <form onSubmit={addPaciente} className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="border p-2 flex-1 rounded"
          required
        />
        <input
          type="text"
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          className="border p-2 flex-1 rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 rounded">
          Agregar
        </button>
      </form>

      {/* Lista de pacientes */}
      <ul className="space-y-2">
        {pacientes.map((pac) => (
          <li
            key={pac.id}
            className="flex justify-between items-center border p-2 rounded"
          >
            <span>
              {pac.nombre} {pac.apellido}
            </span>
            <button
              onClick={() => deletePaciente(pac.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
