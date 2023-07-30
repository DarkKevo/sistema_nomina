import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { CrearPdfEmpleado } from "../../pdf/controllers/PdfEmpleado";
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import { MyDoc } from "../../pdf/plantillas/Pdf";
import { MyConst } from "../../pdf/plantillas/Constancia";
let data = { datos: "datos" };
let Pdf = MyDoc();
let Constancia = MyConst();
let tittle = "Inf_Emp";

export default function ModalPDF(idEmpleados) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <button
        className="text-sm border-2 border-black rounded-lg p-1"
        onClick={async () => {
          data = await CrearPdfEmpleado(idEmpleados);
          Pdf = await MyDoc(data);
          Constancia = await MyConst(data);
          if (data.apellidos != "" && data.apellidos !== undefined) {
            tittle = data.apellidos;
          }
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
          <PDFDownloadLink
            document={Pdf}
            fileName={`${tittle}.pdf`}
            className="bg-white bg-opacity-90 border-2 border-black font-bold w-1/2 p-2 rounded text-center"
          >
            Datos personales
          </PDFDownloadLink>
          <PDFDownloadLink
            document={Constancia}
            fileName={`${tittle}_Constancia.pdf`}
            className="bg-white bg-opacity-90 border-2 border-black font-bold w-1/2 p-2 rounded"
          >
              Constancia de trabajo
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  );
}
