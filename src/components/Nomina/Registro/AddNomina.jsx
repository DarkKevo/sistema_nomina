import { useState } from "react";
import { useMutation } from "react-query";
import { Toaster, toast } from "react-hot-toast";
import Swal from "sweetalert2";

export default function AddPreNomina({ update }) {
  const [openModal, setOpenModal] = useState(false);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaCierre, setFechaCierre] = useState("");

  const mutation = useMutation(
    (datos) => {
      const res = fetch("http://localhost:3000/PrePagos", {
        method: "POST",
        body: JSON.stringify(datos),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      }).then((res) => res.json());
      return res;
    },
    {
      onSuccess: (data) => {
        if (data.message) {
          Swal.fire({
            title: "Nomina registrado!",
            icon: "success",
            timer: 3000,
          }).then(()=>{update()})
        } else {
          toast.error("Datos erroneos!");
        }
        setOpenModal(false);
        
      },
      onError: (err) => {
        console.log(err);
        toast.error("Ha ocurrido un error!");
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      fecha_ini: fechaInicio,
      fecha_cul: fechaCierre,
    };
    mutation.mutate(data);
  };

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="flex items-center text-sm border-2 border-DarkBlue p-2 rounded-lg font-bold hover:bg-DarkBlue hover:bg-opacity-70 hover:text-white"
      >
        Generar Nomina
      </button>
      <div
        className={`${
          openModal ? "grid" : "hidden"
        } fixed place-items-center top-0 left-0 w-full h-screen bg-black bg-opacity-80 z-10`}
      >
        <div
          className={`grid bg-DarkBlue right-5 w-2/5 h-3/4 place-items-center z-10 rounded-lg`}
        >
          <form
            className="w-full flex flex-col items-center h-full justify-between gap-5 p-4"
            action=""
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <h2 className="text-white text-left w-full border-b-2 border-white p-3">
              Ingrese los datos del Cargo
            </h2>
            <div className="w-full flex flex-col items-center gap-14">
              <div className="w-full flex flex-col gap-3 items-start">
                <label className="text-white text-sm">
                  Ingrese la fecha de{" "}
                  <strong className="text-lg">Inicio</strong> de la nomina:
                </label>
                <input
                  type="date"
                  className="w-full p-3 rounded-lg"
                  onChange={(e) => setFechaInicio(e.target.value)}
                />
              </div>
              <div className="w-full flex flex-col gap-3 items-start">
                <label className="text-white text-sm">
                  Ingrese la fecha de{" "}
                  <strong className="text-lg">Cierre</strong> de la nomina:
                </label>
                <input
                  type="date"
                  className="w-full p-3 rounded-lg"
                  onChange={(e) => setFechaCierre(e.target.value)}
                />
              </div>
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
