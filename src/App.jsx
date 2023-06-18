import { useState } from 'react'
import {Route, Routes} from 'react-router-dom'
import Login from './views/Login'
import Register from './views/Register'
import Dashboard from './components/Dashboard'
import Inicio from './components/Inicio'
import Cargos from './components/Cargos'
function App() {

  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/registro' element={<Register/>}/>
      <Route path='/sesion' element={<Dashboard/>}>
        <Route path='inicio' element={<Inicio/>}/>
        <Route path='cargos' element={<Cargos/>}/>
      </Route>
    </Routes>
  )
}

export default App
