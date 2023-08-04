import { useContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import Dashboard from "./components/Dashboard";
import Inicio from "./components/Inicio";
import Cargos from "./components/Cargos/Cargos";
import Departamentos from "./components/Departamentos/Departamentos";
import Empleados from "./components/Empleados/Empleados";
import { sesion } from "./context/ValidateSesion";
import RutasProtegidas from "./routes/RutasProtegidas";
import Pagos from "./components/Pagos/Pagos";
import Horas from "./components/Horas/Horas";
import RutasIncio from "./routes/RutasInicio";


import { ThreeCircles } from  'react-loader-spinner'
function App() {
const {loader} = useContext(sesion)
  return (
    <>

      <Routes>
        <Route path="/" element={<RutasIncio><Login /></RutasIncio>} />
        <Route path="/registro" element={<RutasIncio><Register /></RutasIncio>} />
        <Route path="/sesion" element={<RutasProtegidas><Dashboard /></RutasProtegidas>}>
          <Route path="inicio" element={<Inicio />} />
          <Route path="cargos" element={<Cargos />} />
          <Route path="departamentos" element={<Departamentos />} />
          <Route path="empleados" element={<Empleados />} />
          <Route path="pagos" element={<Pagos />} />
          <Route path="horas" element={<Horas />} />
        </Route>
      </Routes>

      <div className={loader ? "bg-black grid place-items-center fixed w-full h-screen top-0 left-0 z-30 bg-opacity-80" : 'hidden'}>
        <ThreeCircles
        color="#27374D"
        />
      </div>
    </>
  );
}

export default App;
