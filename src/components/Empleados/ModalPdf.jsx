import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { CrearPdfEmpleado } from "../../pdf/controllers/PdfEmpleado";

export default function ModalPDF() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <button
        className="text-sm border-2 border-black rounded-lg p-1"
        onClick={() => {
          CrearPdfEmpleado();
          setOpenModal(!openModal);
        }}
      >
        PDF
      </button>
      <div
        className={
          openModal
            ? " grid fixed place-items-center top-0 left-0 w-full h-screen bg-black bg-opacity-80 z-10"
            : "hidden"
        }
      >
        <div className="bg-DarkBlue w-1/2 flex flex-col p-10 items-center justify-between gap-5 rounded-lg">
        <FaTimes className="self-end text-white text-3xl cursor-pointer" onClick={()=>setOpenModal(false)}/>
          <h2 className="text-white font-semibold">Seleccione el pdf</h2>
          <button className="bg-white bg-opacity-90 border-2 border-black font-bold w-1/2 p-2 rounded">Datos personales</button>
          <button className="bg-white bg-opacity-90 border-2 border-black font-bold w-1/2 p-2 rounded">Constancia de trabajo</button>
        </div>
      </div>
    </div>
  );
}
