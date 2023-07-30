import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { FaPlus, FaRegEdit } from "react-icons/fa";
import Swal from "sweetalert2";

export default function ModalEmpresa() {
  //estados para el fetch
  const [nombreEmpresa, setNombreEmpresa] = useState("");
  const [direccionEmpresa, setDireccionEmpresa] = useState("");
  const [Rif, setRif] = useState("");
  const [TelefonoEmpresa, setTelefonoEmpresa] = useState("");
  const [Correo, setCorreo] = useState("");
  const [openModal, setOpenModal] = useState(true);
  return (
    <>
      <div
        className={`${
          openModal ? "grid" : "hidden"
        } fixed place-items-center top-0 left-0 w-full h-screen bg-black bg-opacity-80 z-10`}
      >
        <div
          className={`grid fixed bg-DarkBlue right-5 w-3/4 h-3/4 place-items-center z-10 rounded-lg`}
        >
          <form
            className="w-full flex flex-col items-center h-full justify-between gap-5"
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
    </>
  );
}
