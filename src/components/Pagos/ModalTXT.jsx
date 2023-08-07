import { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useMutation, useQuery } from "react-query";

export default function ModalTXT({ id }) {
  const [openModal, setOpenModal] = useState(false);
  const [fechaInicio, setFechaInicio] = useState('')

  const mutation = useMutation(
    (datos) => {
      const res = fetch("http://localhost:3000/descargartxt", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      });
      return res.then((respons) => respons.text());
    },
    {
      onSuccess: (data) => {
        const blob = new Blob([data], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "archivo.txt");
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();

        URL.revokeObjectURL(url);
        document.body.removeChild(link);
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      id_file: id,
      fecha_init: fechaInicio
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
        Generar Nomina
      </button>
      <div
        className={`${
          openModal ? "flex" : "hidden"
        } fixed justify-center items-center top-0 left-0 w-full h-screen bg-black bg-opacity-80 z-10`}
      >
        <div
          className={`flex flex-col justify-center gap-8 p-4  bg-DarkBlue right-5 w-1/2 h-3/4 place-items-center z-10 rounded-lg text-lg`}
        >
          <FaTimes
            className="self-end text-white text-3xl cursor-pointer"
            onClick={() => setOpenModal(false)}
          />
          <form className="w-full flex flex-col gap-7 items-center" onSubmit={handleSubmit}>
            <div className="w-3/4 flex flex-col gap-2 ">
              <label htmlFor="" className="text-white text-sm">
                Ingrese la fecha de <strong className="text-lg">inicio</strong> del pago de nomina:
              </label>
                <input onChange={(e)=>setFechaInicio(e.target.value)} value={fechaInicio} type="date" name="" id="" className="w-full p-2 border-2 border-white rounded" />
            </div>
            <input type="submit" value='enviar' className="bg-white bg-opacity-90 border-2 border-black font-bold w-1/6 p-2 rounded cursor-pointer" />
          </form>
        </div>
      </div>
    </>
  );
}
