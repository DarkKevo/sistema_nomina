import { useContext } from "react";
import { sesion } from "../context/ValidateSesion";
import { Navigate } from "react-router-dom";

export default function RutasIncio({children}){
    const {token} = useContext(sesion)
    if(token == 0 ){
        return children
    }else{
        return <Navigate to={'/sesion/inicio'}/>
    }

}