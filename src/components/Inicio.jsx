import { useContext } from "react";
import { useQuery } from "react-query";
import ModalEmpresa from "./ModalEmpresa";
import { FaRegEdit } from "react-icons/fa";
export default function Inicio() {

  const empresa = useQuery("empresa", () =>
    fetch("http://localhost:3000/ListarEmpresa").then((res) => res.json())
  );

  if(empresa.isLoading){
    return <>cargando...</>
  }

  return (
    <div className="w-full flex flex-col items-center justify-center font-poppins p-10">
      {empresa.data && !empresa.data.error ? (
        <div className="w-3/4 bg-DarkBlue p-10 flex flex-col items-center justify-evenly gap-5 rounded-lg text-white">
          <ModalEmpresa isEdit={true} refetch={empresa.refetch} open={false}/>
          <img
            className="w-[200px] h-[200px] rounded-[60%] object-center object-cover -mt-28 border-2 border-white"
            src="../public/empresa_img.jpg"
            alt="logo_empresa"
          />
          <h1 className="text-4xl font-bold">{empresa.data[0].nombre}</h1>
          <div className="flex w-full">
            <div className="p-3 rounded-lg flex flex-col gap-5 font-bold w-1/2">
              <p>Direccion: </p>
              <p>RIF: </p>
              <p>Telefono: </p>
              <p>Corrreo: </p>
            </div>
            <div className="bg-LightBlue p-3 rounded-lg flex flex-col gap-5 w-1/2 ">
              <p>{empresa.data[0].direccion}</p>
              <p>{empresa.data[0].rif}</p>
              <p>{empresa.data[0].telefono}</p>
              <p>{empresa.data[0].correo}</p>
            </div>
          </div>
        </div>
      ) : (
        <>no hay</>
      )}
      <ModalEmpresa open={empresa.data && !empresa.data.error ? false : true} refetch={empresa.refetch} />
    </div>
  );
}
