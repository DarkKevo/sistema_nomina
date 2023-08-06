import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { FaPlus, FaRegEdit } from "react-icons/fa";
import Swal from "sweetalert2";

export default function AddModalPagos({ isEdit, id, update, bancoData }) {
  //estados para el fetch
  const [CodigoCuenta, setCodigoCuenta] = useState(isEdit ? bancoData.codigo:"");
  const [nombreCuenta, setNombreCuenta] = useState(isEdit ? bancoData.nombre:"");
  const [NumeroCuenta, setNumeroCuenta] = useState(isEdit ? bancoData.cuenta:"");
  const [openModal, setOpenModal] = useState(false);

  const mutation = useMutation(
    (datos) => {
      const res = fetch(
        isEdit
          ? "http://localhost:3000/ActualizaBanco"
          : "http://localhost:3000/CrearBanco",
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
        if (data.ok !== true) {
          Swal.fire({
            title: "Datos incorrectos",
            icon: "error",
            timer: 3000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            title: isEdit ? "Banco Editado!" : "Banco registrado!",
            icon: "success",
            timer: 3000,
          });
          update();
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
          codigo: CodigoCuenta,
          nombre: nombreCuenta,
          cuenta: NumeroCuenta,
          idbancos: id,
        }
      : {
        codigo:CodigoCuenta,
          nombre: nombreCuenta,
          cuenta: NumeroCuenta,
        };
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
            Añadir Banco <FaPlus className="text-xl" />
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
              Ingrese los datos del Cargo
            </h2>
            <div className="flex flex-col items-center gap-4">
              <input
                className="p-3 rounded w-full"
                type="text"
                name=""
                id=""
                value={nombreCuenta}
                onChange={(e) => setNombreCuenta(e.target.value)}
                placeholder="Ingrese el nombre del banco"
              />
              <input
                className="p-3 rounded w-full"
                type="text"
                name=""
                id=""
                value={CodigoCuenta}
                onChange={(e) => setCodigoCuenta(e.target.value)}
                placeholder="Ingrese el codigo de su cuenta"
              />
              <input
                className="p-3 rounded w-full"
                type="text"
                name=""
                id=""
                value={NumeroCuenta}
                onChange={(e) => setNumeroCuenta(e.target.value)}
                placeholder="Ingrese el numero de cuenta"
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
