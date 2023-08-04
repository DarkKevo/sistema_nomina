import { useQuery, useMutation } from "react-query";
import { useContext } from "react";
import { FaRegTrashAlt, FaUserTie } from "react-icons/fa";
import Swal from "sweetalert2";
import AddModalDeducciones from "./AddModalDeduccion";
import {sesion} from '../../../context/ValidateSesion'

export default function Deducciones() {
  let tableStyle = "border-b-2 text-center drop-shadow-xl p-5";
    const {setLoader} = useContext(sesion)

  const deducciones = useQuery("deducciones", () =>
    fetch("http://localhost:3000/ListarDeducciones").then((res) => res.json())
  );

  const mutation = useMutation(
    (data) => {
      const res = fetch("http://localhost:3000/EliminarDeduccion", {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      return res;
    },
    {
      onSuccess: (data) => {
        console.log(data);
        if (data.ok !== true) {
          Swal.fire({
            title: "Datos incorrectos",
            icon: "error",
            timer: 3000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            title: "Deducción Eliminada!",
            icon: "success",
            timer: 3000,
          });
          deducciones.refetch();
        }
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const handleDelete = (e, id) => {
    e.preventDefault();
    const data = {
        iddeducciones: id,
    };
    mutation.mutate(data);
  };

  if (deducciones.isLoading) {
      setLoader(true);
      return (<></>);
    }
    if(deducciones.isSuccess){
      setLoader(false)
    }

  return (
    <>
      <div className="w-11/12 flex flex-col items-center gap-10">
        <nav className="w-3/4 rounded-md flex justify-between">
          <h1 className="flex gap-2 items-center text-sm font-bold">
            <FaUserTie className="text-2xl" /> Deducciones en la empresa
          </h1>
          <AddModalDeducciones isEdit={false} update={deducciones.refetch} />
        </nav>
        {deducciones.data.error ? (
          <>No hay</>
        ) : (
          <table className="w-3/4 border-collapse border-2">
            <thead>
              <tr>
                
                <th
                  className={
                    tableStyle + " bg-DarkBlue bg-opacity-70 text-white"
                  }
                >
                  Descripcion
                </th>
                <th
                  className={
                    tableStyle + " bg-DarkBlue bg-opacity-70 text-white"
                  }
                >
                  Monto
                </th>
                <th
                  className={
                    tableStyle + " bg-DarkBlue bg-opacity-70 text-white"
                  }
                >
                  ACTION
                </th>
              </tr>
            </thead>
            {deducciones.data && (
              <tbody>
                {deducciones.data.map((deduccion) => (
                  <tr key={deduccion.iddeducciones}>
                    <td className={tableStyle}>{deduccion.descripcion_deduccion}</td>
                    <td className={tableStyle}>{deduccion.monto_deduccion}</td>
                    <td className="border-b-2">
                      <div className="flex items-center justify-center text-2xl gap-3">
                        <button>
                          <FaRegTrashAlt
                            onClick={(e) => handleDelete(e, deduccion.iddeducciones)}
                          />
                        </button>
                        <AddModalDeducciones
                          id={deduccion.iddeducciones}
                          isEdit={true}
                          update={deducciones.refetch}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        )}
      </div>
    </>
  );
}
