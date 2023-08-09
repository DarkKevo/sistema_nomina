import { useMutation, useQuery } from "react-query";
import { FaUserTie, FaRegTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

export default function Historial() {
  let tableStyle = "border-b-2 text-center drop-shadow-xl p-5";

  const historialNominas = useQuery("historialNominas", () =>
    fetch("http://localhost:3000/Listarnomina").then((res) => res.json())
  );

  const mutation = useMutation(
    (datos) => {
      const res = fetch("http://localhost:3000/EliminarNomina", {
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
            title: "Nomina Eliminada!",
            icon: "success",
            timer: 3000,
          });
          historialNominas.refetch();
        }
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const handleDelete = (e, id_nomina, fecha_ini, fecha_cul) => {
    Swal.fire({
      text: "¿Seguro de que desea eliminar la nomina?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((resultado) => {
      if (resultado.value) {
        const data = {
          id_nomina,
          fecha_ini,
          fecha_cul,
        };
        mutation.mutate(data);
        mutation.mutate(data);
      }
    });
  };

  if (historialNominas.isLoading) {
    return <></>;
  }

  return (
    <div className="w-full py-10 flex flex-col items-center justify-start gap-10">
      <nav className="w-3/4 rounded-md flex justify-between">
        <h1 className="flex gap-2 items-center text-sm font-bold">
          <FaUserTie className="text-2xl" /> Historial de nominas pagadas
        </h1>
      </nav>
      {historialNominas.data.error ? (
        <>No hay</>
      ) : (
        <table className=" border-collapse border-2">
          <thead>
            <tr>
              <th
                className={tableStyle + " bg-DarkBlue bg-opacity-70 text-white"}
              >
                FECHA INICIAL
              </th>
              <th
                className={tableStyle + " bg-DarkBlue bg-opacity-70 text-white"}
              >
                FECHA DE CIERRE
              </th>
              <th
                className={tableStyle + " bg-DarkBlue bg-opacity-70 text-white"}
              >
                MONTO PAGADO TOTAL
              </th>
            </tr>
          </thead>
          {historialNominas.data && (
            <tbody>
              {historialNominas.data.map((nomina) => (
                <tr key={nomina.id_nomina}>
                  <td className={tableStyle}>{nomina.fecha_inicial}</td>
                  <td className={tableStyle}>{nomina.fecha_final}</td>
                  <td className="border-b-2">
                    <div className="flex items-center justify-center text-2xl gap-3">
                      <button>
                        <FaRegTrashAlt
                          onClick={(e) =>
                            handleDelete(
                              e,
                              nomina.id_nomina,
                              nomina.fecha_inicial,
                              nomina.fecha_final
                            )
                          }
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      )}
    </div>
  );
}
