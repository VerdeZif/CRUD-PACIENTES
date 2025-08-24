export interface Cita {
  id: number;
  fecha: string;
  hora: string;
  paciente: Paciente;
}

export interface Paciente {
  id: number;
  nombre: string;
  apellido: string;
  citas?: Cita[]; // opcional para la lista con citas incluidas
}
