import { useEffect, useState } from "react";
import { FaRegTrashAlt, FaMoneyBillAlt, FaPlus } from "react-icons/fa";
import { useQuery, useMutation } from "react-query";
import AddModalSalarios from "./AddModalSalarios";
import Swal from "sweetalert2";

export default function Cargos() {
  let tableStyle = "border-b-2 text-center drop-shadow-xl p-5";

  const { data } = useQuery("repoData", () =>
    fetch("http://localhost:3000/ListarSalario").then((res) => res.json())
  );

  const mutation = useMutation(
    (data) => {
      const res = fetch("http://localhost:3000/EliminarSalario", {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      return res;
    },
    {
      onSuccess: (data) => {
        console.log(data);
        data.ok !== true
          ? Swal.fire({
              title: "Datos incorrectos",
              icon: "error",
              timer: 3000,
              showConfirmButton: false,
            })
          : Swal.fire({
              title: "Salario Eliminado!",
              icon: "success",
              timer: 3000,
            });
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const handleDelete = (e, id) => {
    e.preventDefault();
    let data = {
      idsalario: id,
    };
    mutation.mutate(data);
  };

  return (
    <div className="w-full py-10 flex flex-col items-center justify-start gap-10">
      <nav className="w-3/4 rounded-md flex justify-between">
        <h1 className="flex gap-2 items-center text-sm font-bold">
          <FaMoneyBillAlt className="text-2xl" /> Salarios de la empresa
        </h1>
        <AddModalSalarios isEdit={false} />
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
              MONTO
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
            {data.map((salario) => (
              <tr key={salario.idsalario}>
                <td className={tableStyle}>{salario.idsalario}</td>
                <td className={tableStyle}>{salario.monto_salario}</td>
                <td className="border-b-2">
                  <div className="flex items-center justify-center text-2xl gap-3">
                    <button>
                      <FaRegTrashAlt
                        onClick={(e) => handleDelete(e, salario.idsalario)}
                      />
                    </button>
                    <AddModalSalarios id={salario.idsalario} isEdit={true} />
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
