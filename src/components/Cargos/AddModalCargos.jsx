import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { FaPlus, FaRegEdit } from "react-icons/fa";
import Swal from "sweetalert2";

export default function AddModalCargos({ isEdit, id }) {
  //estados para el fetch
  const [nombreCargo, setNombreCargo] = useState("");
  const [valorSalario, setValorSalario] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const mutation = useMutation(
    (datos) => {
      const res = fetch(
        isEdit
          ? "http://localhost:3000/ActualizarCargo"
          : "http://localhost:3000/CrearCargo",
        {
          method: isEdit ? "PUT" : "POST",
          body: JSON.stringify(datos),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );
      return res;
    },
    {
      onSuccess: (data) => {
        console.log(data);
        data.ok !== true
          ? Swal.fire({
              title: "Datos incorrectos",
              icon: "error",
              timer: 3000,
              showConfirmButton: false,
            })
          : Swal.fire({
              title: isEdit ? "Cargo Editado!" : "Cargo registrado!" ,
              icon: "success",
              timer: 3000,
            });
        setOpenModal(false);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const { data } = useQuery("dataMontos", () =>
    fetch("http://localhost:3000/ListarSalario").then((res) => res.json())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    let codigo = data.filter((x) => x.monto_salario == valorSalario);
    const datos = isEdit
      ? {
          idcargos: id,
          cargo: nombreCargo,
          monto_salario: valorSalario,
        }
      : {
          cargo: nombreCargo,
          monto_salario: valorSalario,
        };
    mutation.mutate(datos);
  };
  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className={
          isEdit
            ? ""
            : "flex items-center text-sm border-2 border-DarkBlue p-2 rounded-lg font-bold hover:bg-DarkBlue hover:bg-opacity-70 hover:text-white"
        }
      >
        {isEdit ? (
          <FaRegEdit />
        ) : (
          <>
            Añadir Cargo <FaPlus className="text-xl" />
          </>
        )}
      </button>
      <div
        className={`${
          openModal ? "grid" : "hidden"
        } fixed place-items-center top-0 left-0 w-full h-screen bg-black bg-opacity-80 z-10`}
      >
        <div
          className={`grid fixed bg-DarkBlue right-5 w-3/4 h-3/4 place-items-center z-10 rounded-lg`}
        >
          <form
            className="flex flex-col items-center h-full justify-between gap-5 p-4"
            action=""
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <h2 className="text-white text-left w-full border-b-2 border-white p-3">
              Ingrese los datos del Cargo
            </h2>
            <div className="flex flex-col items-center gap-4">
              <input
                className="p-3 rounded w-full"
                type="text"
                name=""
                id=""
                value={nombreCargo}
                onChange={(e) => setNombreCargo(e.target.value)}
                placeholder="Ingrese el nombre del cargo"
              />
              <select
                onChange={(e) => setValorSalario(e.target.value)}
                className="p-3 rounded w-full"
                name=""
                id=""
              >
                <option value="">Seleccione el monto del salario</option>
                {data &&
                  data.map((monto) => (
                    <option
                      key={monto.monto_salario}
                      value={monto.monto_salario}
                    >
                      {monto.monto_salario}
                    </option>
                  ))}
              </select>
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
