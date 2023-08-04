import { useState } from "react";

export default function AddModalVacaciones() {
  const [openModal, setOpenModal] = useState(false);

  const [dias, setDias] = useState("");
  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="flex items-center text-sm border-2 border-DarkBlue p-2 rounded-lg font-bold hover:bg-DarkBlue hover:bg-opacity-70 hover:text-white"
      >
        Usar Vacaciones
      </button>
      <div
        className={`${
          openModal ? "grid" : "hidden"
        } fixed place-items-center top-0 left-0 w-full h-screen bg-black bg-opacity-80 z-10`}
      >
        <div
          className={`grid  bg-DarkBlue right-5 w-1/2 h-3/4 place-items-center z-10 rounded-lg`}
        >
          <form
            className="flex flex-col items-center h-full justify-between gap-5 p-4"
            action=""
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <h2 className="text-white text-left w-full border-b-2 border-white p-3">
              Ingrese los datos para uso de vacaciones
            </h2>
            <div className="w-full flex flex-col items-start gap-4">
              <label htmlFor="" className="text-white text-sm">
                Ingrese la cantidad de dias de vacaciones a usar:
              </label>

              <input
                value={dias}
                onChange={(e) => setDias(e.target.value)}
                type="number"
                className="p-3 rounded w-full"
                placeholder="Ingrese los dias"
                min={14}
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
