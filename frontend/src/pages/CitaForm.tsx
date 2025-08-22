import React, { useEffect, useState } from "react";

interface Paciente {
    id: number;
    nombre: string;
    }

const CitaForm: React.FC = () => {
    const [pacientes, setPacientes] = useState<Paciente[]>([]);
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [pacienteId, setPacienteId] = useState<number | null>(null);
    const [error, setError] = useState("");
};