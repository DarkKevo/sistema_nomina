import { useEffect, useState } from "react";
import { FaRegTrashAlt, FaRegEdit, FaUsers, FaPlus } from "react-icons/fa";
import { useQuery } from "react-query";
import AddModalEmpleados from './AddModalEmpleados'
import { CrearPdfEmpleado } from "../../pdf/controllers/PdfEmpleado";

export default function Empleados() {
  const { data } = useQuery("repoData", () =>
      fetch("http://localhost:3000/ListarEmpleados").then((res) => res.json())
    );
  let tableStyle = "border-b-2 text-center drop-shadow-xl p-2";

  return (
    <div className="w-full py-10 flex flex-col items-center justify-start gap-10">
      <nav className="w-3/4 rounded-md flex justify-between">
        <h1 className="flex gap-2 items-center text-sm font-bold">
          <FaUsers className="text-2xl" /> Empleados en la empresa
        </h1>
        <AddModalEmpleados/>
      </nav>
      <table className="w-1/4 border-collapse border-2">
        <thead>
          <tr>
            <th
              className={tableStyle + " bg-DarkBlue bg-opacity-70 text-white"}
            >
              CEDULA
            </th>
            <th
              className={tableStyle + " bg-DarkBlue bg-opacity-70 text-white"}
            >
              NOMBRES
            </th>
            <th
              className={tableStyle + " bg-DarkBlue bg-opacity-70 text-white"}
            >
              APELLIDOS
            </th>
            <th
              className={tableStyle + " bg-DarkBlue bg-opacity-70 text-white"}
            >
              Correo Electronico
            </th>
            <th
              className={tableStyle + " bg-DarkBlue bg-opacity-70 text-white"}
            >
              CARGO
            </th>
            <th
              className={tableStyle + " bg-DarkBlue bg-opacity-70 text-white"}
            >
              Banco
            </th>
            <th
              className={tableStyle + " bg-DarkBlue bg-opacity-70 text-white"}
            >
              DEDUCCION
            </th>
            <th
              className={tableStyle + " bg-DarkBlue bg-opacity-70 text-white"}
            >
              ESTADO
            </th>
            <th
              className={tableStyle + " bg-DarkBlue bg-opacity-70 text-white"}
            >
              ACTIONS
            </th>
          </tr>
        </thead>
        {data && (
          <tbody>
            {data.map((empleado) => (
              <tr key={empleado.idEmpleado}>
                <td className={tableStyle}>{empleado.cedula}</td>
                <td className={tableStyle}>{empleado.nombres}</td>
                <td className={tableStyle}>{empleado.apellidos}</td>
                <td className={tableStyle}>{empleado.correo}</td>
                <td className={tableStyle}>{empleado.codigo_cargo}</td>
                <td className={tableStyle}>{empleado.codigo_departamento}</td>
                <td className={tableStyle}>{empleado.codigo_deduccion}</td>
                <td className={tableStyle}>{empleado.codigo_empresa}</td>
                <td className={tableStyle}>
                  <div className="flex items-center justify-center text-2xl gap-3">
                    <button>
                      <FaRegTrashAlt />
                    </button>
                    <button>
                      <FaRegEdit />
                    </button>
                    <button className="text-sm border-2 border-black rounded-lg p-1" onClick={()=>CrearPdfEmpleado()}>
                      PDF
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}
