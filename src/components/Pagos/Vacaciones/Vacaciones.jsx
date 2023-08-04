import { useQuery, useMutation } from "react-query";
import { FaRegTrashAlt, FaUserTie } from "react-icons/fa";
import AddModalVacaciones from "./AddModalVacacion";
import { sesion } from "../../../context/ValidateSesion";
import { useContext } from "react";

export default function Vacaciones() {

  const { setLoader } = useContext(sesion);

  let tableStyle = "border-b-2 text-center drop-shadow-xl p-5";

  const vacaciones = useQuery("vacaciones", () =>
    fetch("http://localhost:3000/ListarVacaciones").then((res) => res.json())
  );

  if (vacaciones.isLoading) {
    setLoader(true);
    return <></>;
  }
  if (vacaciones.isSuccess) {
    setLoader(false);
  }

  return (
    <>
      <div className="w-11/12 flex flex-col items-center gap-10">
        <nav className="w-3/4 rounded-md flex justify-between">
          <h1 className="flex gap-2 items-center text-sm font-bold">
            <FaUserTie className="text-2xl" /> Vacaciones de empleados
          </h1>
        </nav>
        {vacaciones.data.error ? (
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
                  NOMBRE
                </th>
                <th
                  className={
                    tableStyle + " bg-DarkBlue bg-opacity-70 text-white"
                  }
                >
                  APELLIDO
                </th>
                <th
                  className={
                    tableStyle + " bg-DarkBlue bg-opacity-70 text-white"
                  }
                >
                  VACACIONES ACUMULADAS
                </th>
                <th
                  className={
                    tableStyle + " bg-DarkBlue bg-opacity-70 text-white"
                  }
                >
                  VACACIONES USADAS
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
            {vacaciones.data && (
              <tbody>
                {vacaciones.data.map((empleado) => (
                  <tr key={empleado.idvac}>
                    <td className={tableStyle}>{empleado.nombres}</td>
                    <td className={tableStyle}>{empleado.apellidos}</td>
                    <td className={tableStyle}>
                      {empleado.vacaciones_acumuladas}
                    </td>
                    <td className={tableStyle}>{empleado.vacaciones_usadas}</td>
                    <td className="border-b-2">
                      <div className="flex items-center justify-center text-2xl gap-3">
                        <AddModalVacaciones id={empleado.id_empleado} />
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
