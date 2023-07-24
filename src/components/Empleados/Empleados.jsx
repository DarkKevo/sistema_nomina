import { useEffect, useState } from "react";
import { FaRegTrashAlt, FaRegEdit, FaUsers, FaPlus } from "react-icons/fa";
import { useQuery, useMutation } from "react-query";
import AddModalEmpleados from "./AddModalEmpleados";
import ModalPDF from "./ModalPdf";
import Swal from "sweetalert2";

export default function Empleados() {
  const empleados = useQuery("empleados", () =>
    fetch("http://localhost:3000/ListarEmpleados").then((res) => res.json()),{
      refetchOnWindowFocus: false,
    }
  );

  const mutation = useMutation(
    (data) => {
      const res = fetch("http://localhost:3000/EliminarEmpleado", {
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
            title: "Empleado Eliminado!",
            icon: "success",
            timer: 3000,
          });
          empleados.refetch();
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
      idEmpleados: id,
    };
    mutation.mutate(data);
  };

  let tableStyle = "border-b-2 text-center drop-shadow-xl p-2";

  if (empleados.isLoading||empleados.isIdle) {
    return <span>Cargando...</span>;
  }

  return (
    <div className="w-full py-10 flex flex-col items-center justify-start gap-10">
      <nav className="w-3/4 rounded-md flex justify-between">
        <h1 className="flex gap-2 items-center text-sm font-bold">
          <FaUsers className="text-2xl" /> Empleados en la empresa
        </h1>
        <AddModalEmpleados update={empleados.refetch} />
      </nav>
      {empleados.data.error ? (
        <>no hay</>
      ) : (
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
                Telefono
              </th>
              <th
                className={tableStyle + " bg-DarkBlue bg-opacity-70 text-white"}
              >
                CARGO
              </th>
              <th
                className={tableStyle + " bg-DarkBlue bg-opacity-70 text-white"}
              >
                Departamento
              </th>
              <th
                className={tableStyle + " bg-DarkBlue bg-opacity-70 text-white"}
              >
                Banco
              </th>
              <th
                className={tableStyle + " bg-DarkBlue bg-opacity-70 text-white"}
              >
                Estado
              </th>
              <th
                className={tableStyle + " bg-DarkBlue bg-opacity-70 text-white"}
              >
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody>
            {empleados.data.map((empleado) => (
              <tr key={empleado.idEmpleados}>
                <td className={tableStyle}>{empleado.cedula}</td>
                <td className={tableStyle}>{empleado.nombres}</td>
                <td className={tableStyle}>{empleado.apellidos}</td>
                <td className={tableStyle}>{empleado.correo}</td>
                <td className={tableStyle}>{empleado.telefono}</td>
                <td className={tableStyle}>{empleado.codigo_cargo}</td>
                <td className={tableStyle}>{empleado.codigo_departamento}</td>
                <td className={tableStyle}>{empleado.numero_cuenta}</td>
                <td className={tableStyle}>{empleado.estado}</td>
                <td className='border-b-2'>
                  <div className="flex items-center justify-center text-2xl gap-3">
                    <button
                      onClick={(e) => handleDelete(e, empleado.idEmpleados)}
                    >
                      <FaRegTrashAlt />
                    </button>
                    <button>
                      <AddModalEmpleados idEmpleado={empleado.idEmpleados} isEdit={true} update={empleados.refetch}/>
                    </button>
                    <ModalPDF idEmpleados={empleado.idEmpleados}/>
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
