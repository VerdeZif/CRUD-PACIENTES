// frontend/src/pages/PacienteList.tsx
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api"; // axios
import "../style/PacienteList.css"

type Paciente = { id: number; name: string; lastname: string; };
type Cita = { id: number; fecha: string; hora: string; paciente: string; };

// Datos de prueba mientras no hay backend


function PacienteList() {
  const [repaciente, setRepaciente] = useState<Paciente[]>([]);
  const [recitas, setRecitas] = useState<Cita[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //  Traer datos del backend
        const resPacientes = await api.get<Paciente[]>("/pacientes");
        const resCitas = await api.get<Cita[]>("/citas");

        setRepaciente(Array.isArray(resPacientes.data) ? resPacientes.data : pacientesMock);
        setRecitas(Array.isArray(resCitas.data) ? resCitas.data : citasMock);

      } catch (error) {
        console.log("Usando los datos.");
        setRepaciente([]);
        setRecitas([])
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const elimPaci = (index: number) => {
    if (confirm("Desea eliminar al paciente?")) {
      setRepaciente(prev => prev.filter((_, i) => i !== index));
    }
  };

  const elimCita = (index: number) => {
    if (confirm("Desea eliminar la cita?")) {
      setRecitas(prev => prev.filter((_, i) => i !== index));
    }
  };

  if (loading) return <p>Cargando datos...</p>;

  return (
    <main>
      <div className="main-listado">
        <div className="list-head">
          <div className="head-sup">♠️♦️♥️♣️</div>
          <div className="head-infe">
            <button>
              <Link className="link" to={"/PacienteForm"}>Formulario - Paciente</Link>
            </button>
            <button>
              <Link className="link" to={"/CitaForm"}>Formulario - Cita</Link>
            </button>
          </div>
        </div>
          <div className="list-main">
              <div className="info-list">
                <h2>Pacientes</h2>
                <table border={1}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Apellido</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                <tbody>
                  {repaciente.length === 0 ? (
                    <tr>
                      <td colSpan={4} style={{textAlign:"center"}}>No hay pacientes</td>
                    </tr>
                  ) : repaciente.map((paciente, index) => (
                    <tr key={paciente.id}>
                      <td>{paciente.id}</td>
                      <td>{paciente.name}</td>
                      <td>{paciente.lastname}</td>
                      <td className="actions">
                        <button>
                          <Link to={`/editar/paciente/${paciente.id}`}>📝</Link>
                        </button>
                        <button onClick={() => elimPaci(index)}>❌</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
              <div className="info-list">
                 <h2>Citas</h2>
                <table border={1}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Fecha</th>
                      <th>Hora</th>
                      <th>Paciente</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recitas.length === 0 ? (
                      <tr>
                        <td colSpan={5} style={{textAlign:"center"}}>No hay citas</td>
                      </tr>
                    ) : recitas.map((cita, index) => (
                      <tr key={cita.id}>
                        <td>{cita.id}</td>
                        <td>{cita.fecha}</td>
                        <td>{cita.hora}</td>
                        <td>{cita.paciente}</td>
                        <td className="actions">
                          <button>
                            <Link to={`/editar/cita/${cita.id}`}>📝</Link>
                          </button>
                          <button onClick={() => elimCita(index)}>❌</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
        </div>
        <div className="list-foot">
          <h1>Listado de pacientes - Citas</h1>
        </div>
      </div>
    </main>
  );
}

export default PacienteList;