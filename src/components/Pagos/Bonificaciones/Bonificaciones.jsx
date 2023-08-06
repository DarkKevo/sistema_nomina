import { useQuery, useMutation } from "react-query";
import { FaRegTrashAlt, FaUserTie } from "react-icons/fa";
import Swal from "sweetalert2";
import { sesion } from "../../../context/ValidateSesion";
import { useContext } from "react";
import AddModalBonificaciones from "./AddModalBonificaciones";

export default function Bonificaciones() {
  const { setLoader } = useContext(sesion);

  let tableStyle = "border-b-2 text-center drop-shadow-xl p-5";

  const bonificaciones = useQuery("bonificaciones", () =>
    fetch("http://localhost:3000/ListarBonificacion").then((res) => res.json())
  );

  const mutation = useMutation(
    (data) => {
      const res = fetch("http://localhost:3000/EliminarBonificacion", {
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
            title: "Bonificación Eliminada!",
            icon: "success",
            timer: 3000,
          });
          bonificaciones.refetch();
        }
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const handleDelete = (e, id) => {
    e.preventDefault();
    Swal.fire({
      text: "¿Eliminar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((resultado) => {
      if (resultado.value) {
        const data = {
          idbonificaciones: id,
        };
        mutation.mutate(data);
      }
    });
  };

  if (bonificaciones.isLoading) {
    setLoader(true);
    return <></>;
  }
  if (bonificaciones.isSuccess) {
    setLoader(false);
  }

  return (
    <>
      <div className="w-11/12 flex flex-col items-center gap-10">
        <nav className="w-3/4 rounded-md flex justify-between">
          <h1 className="flex gap-2 items-center text-sm font-bold">
            <FaUserTie className="text-2xl" /> Bonificaciones en la empresa
          </h1>
          <AddModalBonificaciones
            isEdit={false}
            update={bonificaciones.refetch}
          />
        </nav>
        {bonificaciones.data.error ? (
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
            {bonificaciones.data && (
              <tbody>
                {bonificaciones.data.map((bonificacion) => (
                  <tr key={bonificacion.idbonificaciones}>
                    <td className={tableStyle}>
                      {bonificacion.descripcion_bonificacion}
                    </td>
                    <td className={tableStyle}>
                      {bonificacion.monto_bonificacion}
                    </td>
                    <td className="border-b-2">
                      <div className="flex items-center justify-center text-2xl gap-3">
                        <button>
                          <FaRegTrashAlt
                            onClick={(e) =>
                              handleDelete(e, bonificacion.idbonificaciones)
                            }
                          />
                        </button>
                        <AddModalBonificaciones
                          id={bonificacion.idbonificaciones}
                          isEdit={true}
                          update={bonificaciones.refetch}
                          bonificacionData={bonificacion}
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
