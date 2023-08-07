import { useQuery } from "react-query";
import { FaUserTie, FaRegTrashAlt } from "react-icons/fa";
import { sesion } from "../../../context/ValidateSesion";
import { useContext } from "react";
import AddHistorialBonificaciones from "./AdddHistorial";

export default function HistorialBonificaciones() {
  const { setLoader } = useContext(sesion);
  let tableStyle = "border-b-2 text-center drop-shadow-xl p-5";

  const bonificacionesHisto = useQuery("bonificacionesHisto", () =>
    fetch("http://localhost:3000/ListarHistorialb").then((res) => res.json())
  );
  if (bonificacionesHisto.isLoading) {
    setLoader(true);
    return<></>
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
          <AddHistorialBonificaciones update={bonificacionesHisto.refetch}/>
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
                  Descripcion
                </th>
                <th
                  className={
                    tableStyle + " bg-DarkBlue bg-opacity-70 text-white"
                  }
                >
                  Monto
                </th>
              </tr>
            </thead>
            {bonificacionesHisto.data && (
              <tbody>
                {bonificacionesHisto.data.map((bonificacion) => (
                  <tr key={bonificacion.idbonificaciones}>
                    <td className={tableStyle}>
                      {bonificacion.descripcion_bonificacion}
                    </td>
                    <td className={tableStyle}>
                      {bonificacion.monto_bonificacion}
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
