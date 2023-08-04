import { useQuery, useMutation } from "react-query";
import { FaRegTrashAlt, FaUserTie } from "react-icons/fa";
import { sesion } from "../../../context/ValidateSesion";
import { useContext } from "react";

export default function Registro() {
  
  const { setLoader } = useContext(sesion);

  let tableStyle = "border-b-2 text-center drop-shadow-xl p-5";

  const registros = useQuery("registros", () =>
    fetch("http://localhost:3000/ListarPago").then((res) => res.json())
  );

  const pagos = useQuery('pagos', () =>
  fetch("http://localhost:3000/GenerarPagos").then((res) => res.json()))

  if (registros.isLoading) {
    setLoader(true);
    return <></>;
  }
  if (registros.isSuccess) {
    setLoader(false);
  }

  return (
    <>
      <div className="w-11/12 flex flex-col items-center gap-10">
        <nav className="w-3/4 rounded-md flex justify-between">
          <h1 className="flex gap-2 items-center text-sm font-bold">
            <FaUserTie className="text-2xl" /> Registro de los pagos a empleados
          </h1>
          <button onClick={()=>{pagos.refetch(); registros.refetch()}} className="flex items-center text-sm border-2 border-DarkBlue p-2 rounded-lg font-bold hover:bg-DarkBlue hover:bg-opacity-70 hover:text-white">
            Calcular Pagos
          </button>
        </nav>
        {registros.data.error ? (
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
                  CARGO
                </th>
                <th
                  className={
                    tableStyle + " bg-DarkBlue bg-opacity-70 text-white"
                  }
                >
                  CUENTA
                </th>
                <th
                  className={
                    tableStyle + " bg-DarkBlue bg-opacity-70 text-white"
                  }
                >
                  DIAS LABORABLES
                </th>
                <th
                  className={
                    tableStyle + " bg-DarkBlue bg-opacity-70 text-white"
                  }
                >
                  DIAS EXTRAS
                </th>
                <th
                  className={
                    tableStyle + " bg-DarkBlue bg-opacity-70 text-white"
                  }
                >
                  DIAS DE DESCANSO
                </th>
                <th
                  className={
                    tableStyle + " bg-DarkBlue bg-opacity-70 text-white"
                  }
                >
                  PAGO TOTAL
                </th>
                <th
                  className={
                    tableStyle + " bg-DarkBlue bg-opacity-70 text-white"
                  }
                >
                  FECHA
                </th>
              </tr>
            </thead>
            {registros.data && (
              <tbody>
                {registros.data.map((pago) => (
                  <tr key={pago.idrespaldo_pagos}>
                    <td className={tableStyle}>{pago.nombre}</td>
                    <td className={tableStyle}>{pago.cargo}</td>
                    <td className={tableStyle}>{pago.cuenta}</td>
                    <td className={tableStyle}>{pago.pagoDiasLaborales}</td>
                    <td className={tableStyle}>{pago.pagoDiasExtras}</td>
                    <td className={tableStyle}>{pago.pagoDiasDescanso}</td>
                    <td className={tableStyle}>{pago.pagoTotal}</td>
                    <td className={tableStyle}>{pago.fecha}</td>
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
