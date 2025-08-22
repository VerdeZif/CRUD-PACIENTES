import { useState , useEffect} from "react";

type Paciente = {
  id: number;
  name: string;
  lastname: string;
  fecha: string;
  time: string;
  paciente: string;
};


function PacienteList() {
  const [repaciente, setRepaciente] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/pacientes/") // backend de Django
      .then((res) => res.json())
      .then((data) => {
        setRepaciente(data); 
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar pacientes:", error);
        setLoading(false);
      });
  }, []);

  const elim = (index: number) => {
    if (confirm("Desea eliminar al paciente")) {
      setRepaciente((pas) => pas.filter((_, i) => i !== index));
    }
  };

  if (loading) {
    return <p>Cargando datos...</p>;
  };

  return (
    <main>
      <div className="main-register">
        <div className="etiquetas">❤️❌👌👌</div>
        <div className="table-map">
          <table border={1}>
            <thead>
              <tr>
                <th>ID</th>
                <th>NOMBRE</th>
                <th>APELLIDO</th>
                <th>FECHA</th>
                <th>HORA</th>
                <th>PACIENTE</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {repaciente.length === 0 ?(
                <tr>              
                    <td colSpan={7} style={{textAlign: "center"}}>
                        hoy nada nada
                    </td>             
                </tr>
              ):(repaciente.map((paciente, index) => (
                <tr key={paciente.id}>
                  <td>{paciente.id}</td>
                  <td>{paciente.name}</td>
                  <td>{paciente.lastname}</td>
                  <td>{paciente.fecha}</td>
                  <td>{paciente.time}</td>
                  <td>{paciente.paciente}</td>
                  <td>
                    <button >Editar</button>
                    <button onClick={() => elim(index)}>Eliminar</button>
                  </td>
                </tr>
              )
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default PacienteList