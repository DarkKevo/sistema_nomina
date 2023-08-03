import { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useMutation, useQuery } from "react-query";

export default function ModalTXT({ bancos }) {
  const [openModal, setOpenModal] = useState(false);

  const mutation = useMutation(
    (datos) => {
      const res = fetch("http://localhost:3000/descargartxt", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((respons) => respons.text());
      return res;
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
      id_file: 1,
      fecha_init: "2023-07-02",
      fecha_final: "2023-07-02",
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
            <input type="submit" />
          </form>
        </div>
      </div>
    </>
  );
}
