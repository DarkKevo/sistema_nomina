import { useContext } from "react";
import { sesion } from "../context/ValidateSesion";
import { Navigate } from "react-router-dom";

export default function RutasProtegidas ({ children }){
  const { token, setToken } = useContext(sesion);

  if (token != '0') {
    return children;
  } else {
    return <Navigate to={"/"} />;
  }
};
