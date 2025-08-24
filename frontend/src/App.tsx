// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import PacienteList from './pages/PacienteList'
import PacienteEdit from './pages/PacienteEdit'
import CitaEdit from './pages/CitaEdit'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CitaForm from './pages/CitaForm'
import PacienteForm from './pages/PacienteForm'

function App() {

  return (
    <BrowserRouter> 
      <Routes>
        <Route path='/' element={<PacienteList/>}></Route>
        <Route path='/PacienteForm' element={<PacienteForm/>}></Route>
        <Route path='/CitaForm' element={<CitaForm/>}></Route>
        <Route path='/editar/paciente/:id' element={<PacienteEdit />}></Route>
        <Route path='/editar/cita/:id' element={<CitaEdit />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
