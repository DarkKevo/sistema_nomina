import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { FaRegTrashAlt, FaUserTie, FaPlus } from "react-icons/fa";
import AddModalCargos from "./AddModalCargos";
import Swal from "sweetalert2";

export default function Cargos() {
  const mutation = useMutation(
    (data) => {
      const res = fetch("http://localhost:3000/EliminarCargo", {
        method: "DELETE",
        body: JSON.stringify(data),
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
            title: "Cargo Eliminado!",
            icon: "success",
            timer: 3000,
          });
          cargos.refetch()
        }
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const handleDelete = (e, id) => {
    e.preventDefault();
    const data = {
      idcargos: id,
    };
    mutation.mutate(data);
  };
  const cargos = useQuery("cargos", () =>
    fetch("http://localhost:3000/ListarCargo").then((res) => res.json())
  );
  let tableStyle = "border-b-2 text-center drop-shadow-xl p-5";

  if (cargos.isLoading) {
    return <span>Cargando...</span>;
  }
  return (
    <div className="w-full py-10 flex flex-col items-center justify-start gap-10">
      <nav className="w-3/4 rounded-md flex justify-between">
        <h1 className="flex gap-2 items-center text-sm font-bold">
          <FaUserTie className="text-2xl" /> Cargos en la empresa
        </h1>
        <AddModalCargos isEdit={false} update={cargos.refetch} />
      </nav>
      {cargos.data.error ? (
        <>No hay</>
      ) : (
        <table className=" border-collapse border-2">
          <thead>
            <tr>
              <th
                className={tableStyle + " bg-DarkBlue bg-opacity-70 text-white"}
              >
                NOMBRE
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
          {cargos.data && (
            <tbody>
              {cargos.data.map((cargo) => (
                <tr key={cargo.idcargos}>
                  <td className={tableStyle}>{cargo.cargo}</td>
                  <td className={tableStyle}>{cargo.salario}</td>
                  <td className="border-b-2">
                    <div className="flex items-center justify-center text-2xl gap-3">
                      <button>
                        <FaRegTrashAlt
                          onClick={(e) => handleDelete(e, cargo.idcargos)}
                        />
                      </button>
                      <AddModalCargos id={cargo.idcargos} isEdit={true} update={cargos.refetch}/>
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
