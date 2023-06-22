import { useState } from 'react'
import {Route, Routes} from 'react-router-dom'
import Login from './views/Login'
import Register from './views/Register'
import Dashboard from './components/Dashboard'
import Inicio from './components/Inicio'
import Cargos from './components/Cargos'
import Salarios from './components/Salarios'
import Departamentos from './components/Departamentos'
import Empleados from './components/Empleados'
import Deducciones from './components/Deducciones'
function App() {

  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/registro' element={<Register/>}/>
      <Route path='/sesion' element={<Dashboard/>}>
        <Route path='inicio' element={<Inicio/>}/>
        <Route path='cargos' element={<Cargos/>}/>
        <Route path='salarios' element={<Salarios/>}/>
        <Route path='departamentos' element={<Departamentos/>}/>
        <Route path='empleados' element={<Empleados/>}/>
        <Route path='deducciones' element={<Deducciones/>}/>
      </Route>
    </Routes>
  )
}

export default App
