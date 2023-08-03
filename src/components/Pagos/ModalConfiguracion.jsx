import { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useMutation, useQuery } from "react-query";
import { toast, Toaster } from "react-hot-toast";

export default function ModalTXT({ bancos, refetch }) {
  const [openModal, setOpenModal] = useState(false);
  const [banco, setBanco] = useState("none");
  const [nombre, setNombre] = useState("");
  const [columnas, setColumnas] = useState("");
  const [separadores, setSeparadores] = useState("");

  const mutation = useMutation(
    (datos) => {
      const res = fetch("http://localhost:3000/Agregarsetup", {
        method: "POST",
        body: JSON.stringify(datos),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      return res;
    },
    {
      onSuccess: (data) => {
        if (data.ok) {
          setOpenModal(false)
          toast.success("Archivo configurado");
          refetch()
        }
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      idbancos: banco,
      tipo_file: nombre,
      columnasfile: columnas,
      separadores,
    };

    mutation.mutate(data);
  };

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className={
          "flex items-center text-sm border-2 border-DarkBlue p-2 rounded-lg font-bold hover:bg-DarkBlue hover:bg-opacity-70 hover:text-white"
        }
      >
        Configurar archivo <FaPlus className="text-xl" />
      </button>
      <div
        className={`${
          openModal ? "grid" : "hidden"
        } fixed place-items-center top-0 left-0 w-full h-screen bg-black bg-opacity-80 z-10`}
      >
        <div
          className={`flex flex-col justify-center gap-8 p-4 fixed bg-DarkBlue right-5 w-3/4 h-3/4 place-items-center z-10 rounded-lg text-lg`}
        >
          <FaTimes
            className="self-end text-white text-3xl cursor-pointer"
            onClick={() => setOpenModal(false)}
          />
          <form className="flex flex-col gap-7" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <label className="text-white">
                Seleccione el tipo de arcchivo que desea:
              </label>
              <select
                onChange={(e) => setNombre(e.target.value)}
                className="p-2 rounded "
                name=""
                id=""
              >
                <option value="0">seleccione</option>
                <option value="TXT">TXT</option>
                <option value="excel">Excel</option>
                <option value="csv">CSV</option>
              </select>
            </div>
            <div className="flex flex-col gap-4">
              <label className="text-white">Seleccione el banco</label>
              {bancos.data.error ? (
                <>no hay</>
              ) : (
                <select
                  value={banco}
                  onChange={(e) => setBanco(e.target.value)}
                  className="p-2 rounded "
                >
                  <option value="none">seleccione el banco</option>
                  {bancos.data.map((banco) => (
                    <option value={banco.idbancos} key={banco.idbancos}>
                      {banco.nombre}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div className="flex flex-col gap-4">
              <label className="text-white" htmlFor="">
                Escriba el nombre de las columnas que quiere separado por comas
              </label>
              <input
                type="text"
                name=""
                placeholder="ej: nombre, cedula, monto, nombre, apellido"
                id=""
                value={columnas}
                className="p-2 rounded "
                onChange={(e) => setColumnas(e.target.value)}
              />
              <label className="text-white" htmlFor="">
                Ingrese el separador de los campos
              </label>
              <input
                type="text"
                name=""
                placeholder=""
                id=""
                value={separadores}
                className="p-2 rounded "
                onChange={(e) => setSeparadores(e.target.value)}
              />
            </div>
            <div className="w-full border-t-2 border-white p-3 flex justify-end gap-3">
              <input
                className="bg-white bg-opacity-90 border-2 border-black font-bold w-1/2 p-2 rounded cursor-pointer"
                type="submit"
                value="Enviar"
              />
              <input
                className="bg-white bg-opacity-90 border-2 border-black font-bold w-1/2 p-2 rounded cursor-pointer"
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
