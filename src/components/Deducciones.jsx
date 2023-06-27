import { useEffect, useState } from "react";
import { FaRegTrashAlt, FaRegEdit, FaDollarSign, FaPlus } from "react-icons/fa";
import { useQuery } from "react-query";

export default function Deducciones() {

  const { data } = useQuery("repoData", () =>
      fetch("http://localhost:3000/ListarDeducciones").then((res) => res.json())
      
    );
  let tableStyle = "border-b-2 text-center drop-shadow-xl p-5";
  return (
    <div className="w-full py-10 flex flex-col items-center justify-start gap-10">
      <nav className="w-3/4 rounded-md flex justify-between">
        <h1 className="flex gap-2 items-center text-sm font-bold">
          <FaDollarSign className="text-2xl" /> Deducciones en la empresa
        </h1>
      </nav>
      <table className=" border-collapse border-2">
        <thead>
          <tr>
            <th
              className={tableStyle + " bg-DarkBlue bg-opacity-70 text-white"}
            >
                MONTO DEDUCCIÓN
            </th>
            <th
              className={tableStyle + " bg-DarkBlue bg-opacity-70 text-white"}
            >
              DESCRIPCIÓN
            </th>
            <th
              className={tableStyle + " bg-DarkBlue bg-opacity-70 text-white"}
            >
              ACTION
            </th>
          </tr>
        </thead>
        {data && (
          <tbody>
            {data.map((deduccion) => (
              <tr key={deduccion.iddeducciones}>
                <td className={tableStyle}>{deduccion.monto}</td>
                <td className={tableStyle}>{deduccion.descripcion}</td>
                <td className={tableStyle}>
                  <div className="flex items-center justify-center text-2xl gap-3">
                    <button>
                      <FaRegTrashAlt />
                    </button>
                    <button>
                      <FaRegEdit />
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
