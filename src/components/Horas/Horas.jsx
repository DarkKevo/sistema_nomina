import { useMutation, useQuery } from "react-query";
import AddModalHoras from "./AddModalHoras";
import { FaRegTrashAlt, FaUserTie } from "react-icons/fa";
import Swal from "sweetalert2";

export default function Horas() {

 

  const fecha_a = (fecha) =>{
    const f = new Date(fecha)
    const fa = `${f.getDate()}-`+ `${f.getMonth() + 1}-`+`${f.getFullYear()}`;
    return(fa)
  }


  return (
    <div className="w-full py-10 flex flex-col items-center justify-start gap-10">
      
        <AddModalHoras  />
  
      
    </div>
  );
}
