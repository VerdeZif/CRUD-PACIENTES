export interface Paciente {
  id: number;
  nombre: string;
  apellido: string;
}

export interface Cita {
  id: number;
  fecha: string;
  hora: string;
  paciente: Paciente;
}
