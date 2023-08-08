import { useMutation, useQuery } from "react-query";
import { FaUserTie, FaRegTrashAlt } from "react-icons/fa";
import { sesion } from "../../../context/ValidateSesion";
import { useContext } from "react";
import AddHistorialBonificaciones from "./AdddHistorial";
import Swal from "sweetalert2";

export default function HistorialBonificaciones() {
  const { setLoader } = useContext(sesion);
  let tableStyle = "border-b-2 text-center drop-shadow-xl p-5";

  const bonificacionesHisto = useQuery("bonificacionesHisto", () =>
    fetch("http://localhost:3000/ListarHistorialb").then((res) => res.json())
  );

  const mutation = useMutation(
    (datos) => {
      const res = fetch("http://localhost:3000/EliminarHistorialB", {
        method: "DELETE",
        body: JSON.stringify(datos),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      return res;
    },
    {
      onSuccess: (data) => {
        if (data.ok !== true) {
          Swal.fire({
            title: "Datos incorrectos",
            icon: "error",
            timer: 3000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            title: "Bonificación Eliminada!",
            icon: "success",
            timer: 3000,
          });
          bonificacionesHisto.refetch();
        }
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const handleDelete = (id) => {
    Swal.fire({
      text: "¿Eliminar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((resultado) => {
      if (resultado.value) {
        const data = {
          id_b: id,
        };
        mutation.mutate(data);
      }
    });
  };

  if (bonificacionesHisto.isLoading) {
    setLoader(true);
    return <></>;
  }

  if (bonificacionesHisto.isSuccess) {
    setLoader(false);
  }

  return (
    <>
      <div className="w-11/12 flex flex-col items-center gap-10">
        <nav className="w-3/4 rounded-md flex justify-between">
          <h1 className="flex gap-2 items-center text-sm font-bold">
            <FaUserTie className="text-2xl" /> Historial Bonificaciones en la
            empresa
          </h1>
          <AddHistorialBonificaciones update={bonificacionesHisto.refetch} />
        </nav>
        {bonificacionesHisto.data.error ? (
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
                  Empleado
                </th>
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
                  Action
                </th>
              </tr>
            </thead>
            {bonificacionesHisto.data && (
              <tbody>
                {bonificacionesHisto.data.map((bonificacion) => (
                  <tr key={bonificacion.id_b}>
                    <td className={tableStyle}>{bonificacion.nombres}</td>
                    <td className={tableStyle}>{bonificacion.bonificacion}</td>
                    <td className="border-b-2">
                      <div className="flex items-center justify-center text-2xl gap-3">
                        <FaRegTrashAlt
                        className="cursor-pointer"
                          onClick={() => {
                            handleDelete(bonificacion.id_b);
                          }}
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
