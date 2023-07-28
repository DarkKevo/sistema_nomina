import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import Dashboard from "./components/Dashboard";
import Inicio from "./components/Inicio";
import Cargos from "./components/Cargos/Cargos";
import Departamentos from "./components/Departamentos/Departamentos";
import Empleados from "./components/Empleados/Empleados";
import ValidateSesion from "./context/ValidateSesion";
import RutasProtegidas from "./routes/RutasProtegidas";
import Pagos from "./components/Pagos/Pagos";
import RutasIncio from "./routes/RutasInicio";
function App() {
  return (
    <>
    <ValidateSesion>
      <Routes>
        <Route path="/" element={<RutasIncio><Login /></RutasIncio>} />
        <Route path="/registro" element={<RutasIncio><Register /></RutasIncio>} />
        <Route path="/sesion" element={<RutasProtegidas><Dashboard /></RutasProtegidas>}>
          <Route path="inicio" element={<Inicio />} />
          <Route path="cargos" element={<Cargos />} />
          <Route path="departamentos" element={<Departamentos />} />
          <Route path="empleados" element={<Empleados />} />
          <Route path="pagos" element={<Pagos />} />
        </Route>
      </Routes>
      </ValidateSesion>
    </>
  );
}

export default App;
