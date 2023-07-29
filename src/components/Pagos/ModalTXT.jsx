import { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useQuery } from "react-query";

export default function ModalTXT({ bancos }) {
  const [openModal, setOpenModal] = useState(false);

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
          <form className="flex flex-col gap-7">
            <div className="flex flex-col gap-4">
              <label className="text-white">
                Seleccione el tipo de arcchivo que desea:
              </label>
              <select className="p-2 rounded " name="" id="">
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
                <select className="p-2 rounded ">
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
                className="p-2 rounded "
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
