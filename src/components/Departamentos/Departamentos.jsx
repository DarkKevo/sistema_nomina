import { useEffect, useState } from "react";
import { FaRegTrashAlt, FaCity, FaPlus } from "react-icons/fa";
import {  useQuery } from "react-query";
import AddModalDepartamento from "./AddModalDepartamentos";

export default function Departamentos() {
  let tableStyle = "border-b-2 text-center drop-shadow-xl p-5";

  const { data } = useQuery("repoData", () =>
    fetch("http://localhost:3000/ListarDepartamento").then((res) => res.json())
  );

  return (
    <div className="w-full py-10 flex flex-col items-center justify-start gap-10">
      <nav className="w-3/4 rounded-md flex justify-between">
        <h1 className="flex gap-2 items-center text-sm font-bold">
          <FaCity className="text-2xl" /> Departamentos de la empresa
        </h1>
        <AddModalDepartamento />
      </nav>
      <table className=" border-collapse border-2">
        <thead>
          <tr>
            <th
              className={tableStyle + " bg-DarkBlue bg-opacity-70 text-white"}
            >
              ID
            </th>
            <th
              className={tableStyle + " bg-DarkBlue bg-opacity-70 text-white"}
            >
              Departamento
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
            {data.map((departamento) => (
              <tr key={departamento.iddepartamentos}>
                <td className={tableStyle}>{departamento.iddepartamentos}</td>
                <td className={tableStyle}>{departamento.departamento}</td>
                <td className="border-b-2">
                  <div className="flex items-center justify-center text-2xl gap-3">
                    <button>
                      <FaRegTrashAlt />
                    </button>
                    <AddModalDepartamento
                      isEdit={true}
                      id={departamento.iddepartamentos}
                    />
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
