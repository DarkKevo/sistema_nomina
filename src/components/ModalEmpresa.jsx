import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { FaPlus, FaRegEdit } from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";

export default function ModalEmpresa({isEdit, refetch,  open, dataEmpresa }) {
  //estados para el fetch
  const [nombreEmpresa, setNombreEmpresa] = useState(
    isEdit ? dataEmpresa.nombre : ""
  );
  const [direccionEmpresa, setDireccionEmpresa] = useState(
    isEdit ? dataEmpresa.direccion : ""
  );
  const [Rif, setRif] = useState(isEdit ? dataEmpresa.rif : "");
  const [TelefonoEmpresa, setTelefonoEmpresa] = useState(
    isEdit ? dataEmpresa.telefono : ""
  );
  const [Correo, setCorreo] = useState(isEdit ? dataEmpresa.correo : "");
  const [img, setImg] = useState(null);
  const [openModal, setOpenModal] = useState(open);

  const mutation = useMutation(
    (datos) => {
      const res = fetch(
        isEdit
          ? "http://localhost:3000/ActualizaEmpresa"
          : "http://localhost:3000/CrearEmpresa",
        {
          method: isEdit ? "PUT" : "POST",
          body: datos,
        }
      );
      return res;
    },
    {
      onSuccess: (data) => {
        refetch();
        toast.success(isEdit ? "Datos editados!" : "Empresa registrada");
        setOpenModal(false);
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (isEdit) {
      formData.append("idEmpresas", 1);
      formData.append("rif", Rif);
      formData.append("nombre", nombreEmpresa);
      formData.append("direccion", direccionEmpresa);
      formData.append("telefono", TelefonoEmpresa);
      formData.append("correo", Correo);
      formData.append("imageURL", img);
    } else {
      formData.append("rif", Rif);
      formData.append("nombre", nombreEmpresa);
      formData.append("direccion", direccionEmpresa);
      formData.append("telefono", TelefonoEmpresa);
      formData.append("correo", Correo);
      formData.append("imageURL", img);
    }
    mutation.mutate(formData);
  };

  return (
    <>
      {isEdit && (
        <button
          className="self-end text-3xl "
          onClick={() => setOpenModal(true)}
        >
          <FaRegEdit />
        </button>
      )}
      <div
        className={`${
          openModal ? "grid" : "hidden"
        } fixed place-items-center top-0 left-0 w-full h-screen bg-black bg-opacity-80 z-10`}
      >
        <div
          className={`grid bg-DarkBlue right-5 w-1/2 h-3/4 place-items-center z-10 rounded-lg`}
        >
          <form
            className="w-full flex flex-col items-center h-full justify-between gap-5 text-black"
            onSubmit={(e) => handleSubmit(e)}
          >
            <h2 className="text-white text-left w-full border-b-2 border-white p-3">
              Ingrese los datos de la empresa
            </h2>
            <div className="w-1/2 flex flex-col items-center gap-4">
              <input
                className="p-3 rounded w-full"
                type="text"
                name=""
                id=""
                value={nombreEmpresa}
                onChange={(e) => setNombreEmpresa(e.target.value)}
                placeholder="Ingrese el nombre de la empresa"
              />
              <input
                className="p-3 rounded w-full"
                type="text"
                name=""
                id=""
                value={direccionEmpresa}
                onChange={(e) => setDireccionEmpresa(e.target.value)}
                placeholder="Ingrese la dirección de la empresa"
              />
              <input
                className="p-3 rounded w-full"
                type="text"
                name=""
                id=""
                value={Rif}
                onChange={(e) => setRif(e.target.value)}
                placeholder="Ingrese el RIF de la empresa"
              />
              <input
                className="p-3 rounded w-full"
                type="text"
                name=""
                id=""
                value={TelefonoEmpresa}
                onChange={(e) => setTelefonoEmpresa(e.target.value)}
                placeholder="Ingrese el telefono de la empresa"
              />
              <input
                className="p-3 rounded w-full"
                type="email"
                name=""
                id=""
                value={Correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="Ingrese el correo de la empresa"
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
      <Toaster />
    </>
  );
}
