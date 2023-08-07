import { useState } from "react";
import { useMutation } from "react-query";
import { FaPlus, FaRegEdit } from "react-icons/fa";
import Swal from "sweetalert2";

export default function AddModalDepartamento({ isEdit, id, update, departamentoData}) {
  //estados para el fetch
  const [departamento, setDepartamento] = useState(isEdit ? departamentoData.departamento: "");
  const [openModal, setOpenModal] = useState(false);

  const mutation = useMutation(
    (datos) => {
      const res = fetch(
        isEdit
          ? "http://localhost:3000/ActualizarDepartamento"
          : "http://localhost:3000/CrearDepartamento",
        {
          method: isEdit ? "PUT" : "POST",
          body: JSON.stringify(datos),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );
      return res;
    },
    {
      onSuccess: (data) => {
        console.log(data);
        if (data.ok !== true) {
          Swal.fire({
            title: "Datos incorrectos",
            icon: "error",
            timer: 3000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            title: isEdit
              ? "Departamento Editado!"
              : "Departamento registrado!",
            icon: "success",
            timer: 3000,
          });
          update()
        }
        setOpenModal(false);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const datos = isEdit
      ? {
          iddepartamentos: id,
          departamento: departamento,
        }
      : {
          departamento: departamento,
        };
    console.log(datos);
    mutation.mutate(datos);
  };
  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className={
          isEdit
            ? ""
            : "flex items-center text-sm border-2 border-DarkBlue p-2 rounded-lg font-bold hover:bg-DarkBlue hover:bg-opacity-70 hover:text-white"
        }
      >
        {isEdit ? (
          <FaRegEdit />
        ) : (
          <>
            Añadir Departamento <FaPlus className="text-xl" />
          </>
        )}
      </button>
      <div
        className={`${
          openModal ? "grid" : "hidden"
        } fixed place-items-center top-0 left-0 w-full h-screen bg-black bg-opacity-80 z-10`}
      >
        <div
          className={`grid fixed bg-DarkBlue right-5 w-3/4 h-3/4 place-items-center z-10 rounded-lg`}
        >
          <form
            className="flex flex-col items-center h-full justify-between gap-5 p-4"
            action=""
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <h2 className="text-white text-left w-full border-b-2 border-white p-3">
              Ingrese los datos del Departamento
            </h2>
            <div className="flex flex-col items-center gap-4">
              <input
                className="p-3 rounded w-full"
                type="text"
                name=""
                id=""
                value={departamento}
                onChange={(e) => setDepartamento(e.target.value)}
                placeholder="Ingrese el nombre del departamento"
              />
            </div>
            <div className="w-full border-t-2 border-white p-3 flex justify-end gap-3">
              <input
                className="bg-white bg-opacity-90 border-2 border-black font-bold w-1/2 p-2 rounded"
                type="submit"
                value="Enviar"
              />
              <input
                className="bg-white bg-opacity-90 border-2 border-black font-bold w-1/2 p-2 rounded"
                type="button"
                value="Cancelar"
                onClick={() => {
                  setOpenModal(false);
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
