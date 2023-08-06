import { useEffect, useState, useContext } from "react";
import { FaRegTrashAlt, FaCity, FaPlus } from "react-icons/fa";
import { useMutation, useQuery } from "react-query";
import AddModalDepartamento from "./AddModalDepartamentos";
import { toast, Toaster } from "react-hot-toast";
import { sesion } from "../../context/ValidateSesion";
import Swal from "sweetalert2";

export default function Departamentos() {
  const { setLoader } = useContext(sesion);

  let tableStyle = "border-b-2 text-center drop-shadow-xl p-5";

  const mutation = useMutation(
    (datos) => {
      const res = fetch("http://localhost:3000/EliminarDepartamento", {
        method: "DELETE",
        body: JSON.stringify(datos),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      return res;
    },
    {
      onSuccess: (data) => {
        if (data.ok !== true) {
          toast.error("error al eliminar el departamento");
        } else {
          toast.success("Eliminado correctamente");
          departamentos.refetch();
        }
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const departamentos = useQuery("departamentos", () =>
    fetch("http://localhost:3000/ListarDepartamento").then((res) => res.json())
  );

  const handleDelete = (id) => {
    Swal.fire({
      text: "¿Eliminar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((resultado) => {
      if (resultado.value) {
        const data = {
          iddepartamento: id,
        };
        mutation.mutate(data);
      }
    });
  };

  if (departamentos.isLoading) {
    setLoader(true);
    return <></>;
  }
  if (departamentos.isSuccess) {
    setLoader(false);
  }

  return (
    <div className="w-full py-10 flex flex-col items-center justify-start gap-10">
      <Toaster />
      <nav className="w-3/4 rounded-md flex justify-between">
        <h1 className="flex gap-2 items-center text-sm font-bold">
          <FaCity className="text-2xl" /> Departamentos de la empresa
        </h1>
        <AddModalDepartamento update={departamentos.refetch} />
      </nav>
      {departamentos.data.error ? (
        <>no hay</>
      ) : (
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

          <tbody>
            {departamentos.data &&
              departamentos.data.map((departamento) => (
                <tr key={departamento.iddepartamentos}>
                  <td className={tableStyle}>{departamento.iddepartamentos}</td>
                  <td className={tableStyle}>{departamento.departamento}</td>
                  <td className="border-b-2">
                    <div className="flex items-center justify-center text-2xl gap-3">
                      <button
                        onClick={() =>
                          handleDelete(departamento.iddepartamentos)
                        }
                      >
                        <FaRegTrashAlt />
                      </button>
                      <AddModalDepartamento
                        isEdit={true}
                        id={departamento.iddepartamentos}
                        update={departamentos.refetch}
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
