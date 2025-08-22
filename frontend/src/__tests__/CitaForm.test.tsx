import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CitaForm from "../pages/CitaForm";
import axios from "axios";

vi.mock("axios"); // Mock de Axios

describe("CitaForm", () => {
  it("muestra error si faltan campos", async () => {
    render(<CitaForm />);
    fireEvent.click(screen.getByText(/guardar cita/i));
    expect(await screen.findByText(/todos los campos son obligatorios/i)).toBeInTheDocument();
  });

  it("envía datos y muestra mensaje de éxito", async () => {
    (axios.post as jest.Mock).mockResolvedValueOnce({ status: 201 });

    render(<CitaForm />);

    fireEvent.change(screen.getByLabelText(/fecha/i), { target: { value: "2025-08-22" } });
    fireEvent.change(screen.getByLabelText(/hora/i), { target: { value: "10:30" } });
    fireEvent.change(screen.getByLabelText(/id del paciente/i), { target: { value: "1" } });

    fireEvent.click(screen.getByText(/guardar cita/i));

    expect(await screen.findByText(/cita registrada con éxito/i)).toBeInTheDocument();
  });
});