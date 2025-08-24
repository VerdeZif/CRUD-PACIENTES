import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import PacienteForm from "./pages/PacienteForm";
import CitaForm from "./pages/CitaForm";
import PacienteList from "./pages/PacienteList";
import PacienteEdit from "./pages/PacienteEdit";
import CitaEdit from "./pages/CitaEdit";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <Router>
      <div className="app-container">
        <header className="navbar">
          <nav className="nav-links">
            <NavLink to="/" className="nav-link">Inicio</NavLink>
            <NavLink to="/pacientes/nuevo" className="nav-link">Nuevo Paciente</NavLink>
            <NavLink to="/citas/nueva" className="nav-link">Nueva Cita</NavLink>
          </nav>
          <button
            className="toggle-button"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle dark mode"
          >
            {darkMode ? "🌙 Oscuro" : "☀️ Claro"}
          </button>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<PacienteList />} />
            <Route path="/pacientes/nuevo" element={<PacienteForm />} />
            <Route path="/citas/nueva" element={<CitaForm />} />
            <Route path="/pacientes/editar/:id" element={<PacienteEdit />} />
            <Route path="/citas/editar/:id" element={<CitaEdit />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
