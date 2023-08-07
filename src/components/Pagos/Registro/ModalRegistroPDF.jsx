import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
let data = { datos: "datos" };
let tittle = "Inf_Pag";

export default function ModalPDF(idEmpleados) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <button
        className="text-sm border-2 border-black rounded-lg p-1"
        onClick={async () => {
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
          <FaTimes
            className="self-end text-white text-3xl cursor-pointer"
            onClick={() => setOpenModal(false)}
          />
          <h2 className="text-white font-semibold">Seleccione el pdf</h2>
          
        </div>
      </div>
    </div>
  );
}
