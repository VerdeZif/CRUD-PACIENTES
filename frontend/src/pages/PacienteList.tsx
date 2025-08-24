import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

interface Cita {
  id: number;
  fecha: string;
  hora: string;
}

interface Paciente {
  id: number;
  nombre: string;
  apellido: string;
  citas: Cita[];
}

export default function PacienteList() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchPacientes = async () => {
    try {
      const res = await api.get("/pacientes/");
      setPacientes(res.data);
    } catch (err) {
      console.error("Error al cargar pacientes:", err);
      setError("Error al cargar pacientes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPacientes();
  }, []);

  const eliminarPaciente = async (pacienteId: number) => {
    if (confirm("¿Seguro que deseas eliminar este paciente?")) {
      try {
        await api.delete(`/pacientes/${pacienteId}/`);
        await fetchPacientes();
      } catch (err) {
        console.error("Error al eliminar paciente:", err);
        alert("Error al eliminar paciente");
      }
    }
  };

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pacientes y Citas</h1>

      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr style={{ backgroundColor: "#f0f0f0" }}>
            <th className="border p-2">#</th>
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Apellido</th>
            <th className="border p-2">Citas</th>
            <th className="border p-2">Opciones</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((paciente) => (
            <tr key={paciente.id}>
              <td className="border p-2">{paciente.id}</td>
              <td className="border p-2">{paciente.nombre}</td>
              <td className="border p-2">{paciente.apellido}</td>
              <td className="border p-2">
                {paciente.citas.length > 0 ? (
                  <ul style={{ paddingLeft: "1rem" }}>
                    {paciente.citas.map((cita) => (
                      <li key={cita.id}>
                        📅 {cita.fecha} ⏰ {cita.hora}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span>Sin citas</span>
                )}
              </td>
              <td className="border p-2 flex-buttons">
                <button
                  onClick={() => navigate(`/pacientes/editar/${paciente.id}`)}
                >
                  Editar Paciente
                </button>

                {paciente.citas.length > 0 && (
                  <button
                    onClick={() =>
                      navigate(`/citas/editar/${paciente.citas[0].id}`)
                    }
                  >
                    Editar Cita
                  </button>
                )}

                <button onClick={() => eliminarPaciente(paciente.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
