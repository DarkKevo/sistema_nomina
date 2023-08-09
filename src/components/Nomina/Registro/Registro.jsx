import { useQuery, useMutation } from "react-query";
import { FaRegTrashAlt, FaUserTie } from "react-icons/fa";
import { sesion } from "../../../context/ValidateSesion";
import { useContext, useState } from "react";
import ModalPDF from "./ModalRegistroPDF";
import Swal from "sweetalert2";
import { Toaster, toast } from "react-hot-toast";
import AddPreNomina from "./AddNomina";

export default function Registro() {
  const { setLoader } = useContext(sesion);

  const [pagosTotal, setPagosTotal] = useState(0);

  let tableStyle = "border-b-2 text-center drop-shadow-xl p-5";

  const preNomina = useQuery("preNomina", () =>
    fetch("http://localhost:3000/ListarPrePago").then((res) => res.json())
  );

  const CalcularPagosTotal = () => {
    let Total = 0;
    preNomina.data.map((x) => {
      Total += x.pagoTotal;
    });
    return Total;
  };

  async function AgregarNomina() {
    const resultado = await Swal.fire({
      text: "Seguro desea generar los pagos y cerrar la nomina?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    });
    if (resultado.value) {
      const res = await fetch("http://localhost:3000/GenerarPagos");
      const data = await res.json();
      if (data.message) {
        toast.success("Nomina cerrada, empleados pagados");
      }
      preNomina.refetch();
    }
  }

  if (preNomina.isLoading) {
    setLoader(true);
    return <></>;
  }

  if (preNomina.isSuccess) {
    setLoader(false);
  }
  return (
    <>
      <div className="w-11/12 flex flex-col items-center gap-10">
        <nav className="w-3/4 rounded-md flex justify-between">
          <h1 className="flex gap-2 items-center text-sm font-bold">
            <FaUserTie className="text-2xl" /> Registro de los pagos a empleados
          </h1>
          <AddPreNomina update={preNomina.refetch} />
        </nav>
        {preNomina.data.error ? (
          <>No hay</>
        ) : (
          preNomina.data && (
            <>
              <table className="w-3/4 border-collapse border-2">
                <thead>
                  <tr>
                    <th
                      className={
                        tableStyle + " bg-DarkBlue bg-opacity-70 text-white"
                      }
                    >
                      CEDULA
                    </th>
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
                      DEPARTAMENTO
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
                      CORREO
                    </th>
                    <th
                      className={
                        tableStyle + " bg-DarkBlue bg-opacity-70 text-white"
                      }
                    >
                      DIAS
                    </th>

                    <th
                      className={
                        tableStyle + " bg-DarkBlue bg-opacity-70 text-white"
                      }
                    >
                      FECHA INICIAL
                    </th>
                    <th
                      className={
                        tableStyle + " bg-DarkBlue bg-opacity-70 text-white"
                      }
                    >
                      FECHA DE CULMINACIÓN
                    </th>
                    <th
                      className={
                        tableStyle + " bg-DarkBlue bg-opacity-70 text-white"
                      }
                    >
                      HORAS TRABAJADAS
                    </th>
                    <th
                      className={
                        tableStyle + " bg-DarkBlue bg-opacity-70 text-white"
                      }
                    >
                      MONTO
                    </th>
                    <th
                      className={
                        tableStyle + " bg-DarkBlue bg-opacity-70 text-white"
                      }
                    >
                      HORAS EXTRAS
                    </th>
                    <th
                      className={
                        tableStyle + " bg-DarkBlue bg-opacity-70 text-white"
                      }
                    >
                      MONTO EXTRA
                    </th>
                    <th
                      className={
                        tableStyle + " bg-DarkBlue bg-opacity-70 text-white"
                      }
                    >
                      MONTO DE DEDUCCIONES
                    </th>
                    <th
                      className={
                        tableStyle + " bg-DarkBlue bg-opacity-70 text-white"
                      }
                    >
                      MONTO DE BONIFICACIONES
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
                      FECHA DE PAGO
                    </th>
                    <th
                      className={
                        tableStyle + " bg-DarkBlue bg-opacity-70 text-white"
                      }
                    >
                      ACTIONS
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {preNomina.data.map((pago) => (
                    <tr key={pago.id_pagos}>
                      <td className={tableStyle}>{pago.cedula}</td>
                      <td className={tableStyle}>{pago.nombre}</td>
                      <td className={tableStyle}>{pago.departamento}</td>
                      <td className={tableStyle}>{pago.cargo}</td>
                      <td className={tableStyle}>{pago.cuenta}</td>
                      <td className={tableStyle}>{pago.correo}</td>
                      <td className={tableStyle}>{pago.dias}</td>
                      <td className={tableStyle}>{pago.fecha_ini}</td>
                      <td className={tableStyle}>{pago.fecha_cul}</td>
                      <td className={tableStyle}>{pago.horas_trabajadas}</td>
                      <td className={tableStyle}>{pago.monto_base}</td>
                      <td className={tableStyle}>{pago.horas_extras}</td>
                      <td className={tableStyle}>{pago.monto_extra}</td>
                      <td className={tableStyle}>{pago.monto_deduccion}</td>
                      <td className={tableStyle}>{pago.monto_bonificacion}</td>
                      <td className={tableStyle}>{pago.pagoTotal}</td>
                      <td className={tableStyle}>{pago.fecha_pago}</td>
                      <td className="border-b-2">
                        <div className="flex items-center justify-center text-2xl gap-3">
                          <ModalPDF dataPago={pago} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="w-full p-5 text-2xl bg-LightBlue text-white flex items-center justify-end gap-10">
                <p>
                  TOTAL DE PAGOS: <strong>{CalcularPagosTotal()}</strong>
                </p>
                <button
                  onClick={() => AgregarNomina()}
                  className="flex items-center border-2 border-white p-3 rounded-lg font-bold hover:bg-DarkBlue hover:bg-opacity-70 hover:text-white"
                >
                  Cerrar Nomina
                </button>
              </div>
            </>
          )
        )}
      </div>
      <Toaster />
    </>
  );
}
