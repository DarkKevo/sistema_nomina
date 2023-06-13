import { useState } from 'react'
import {Route, Routes} from 'react-router-dom'
import Login from './views/Login'
import Register from './views/Register'
function App() {

  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/registro' element={<Register/>}/>
    </Routes>
  )
}

export default App
