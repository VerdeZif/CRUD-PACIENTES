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

    useEffect(()=> { //el useEffect: asistente que hace tareas al terminar el renderizado
        fetch("api/pacientes") //llamada a la API
        .then((response) => response.json()) //convierte la respuesta en JSON
        .then((data) => setPacientes(data)) //establece los pacientes en el estado
        .catch(error => console.error("Error al cargar los pacientes:", error)); //manejo
    },[]);
};