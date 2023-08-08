import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { FaPlus, FaRegEdit } from "react-icons/fa";
import Swal from "sweetalert2";

export default function AddHistorialDeducciones({ update }) {
  const empleados = useQuery("empleados", () =>
    fetch("http://localhost:3000/ListarEmpleados").then((res) => res.json())
  );

  const deducciones = useQuery("deducciones", () =>
    fetch("http://localhost:3000/ListarDeducciones").then((res) => res.json())
  );

  const [openModal, setOpenModal] = useState(false);

  //estados para el fetch
  const [idEmpleado, setIdEmpleado] = useState("none");
  const [nombreEmpleado, setNombreEmpleado] = useState("");
  const [deduccion, setDeduccion] = useState("none");

  const mutation = useMutation(
    (datos) => {
      const res = fetch("http://localhost:3000/AgregarHistorialD", {
        method: "POST",
        body: JSON.stringify(datos),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      return res;
    },
    {
      onSuccess: (data) => {
        if (data.ok !== true) {
          Swal.fire({
            title: "Datos incorrectos",
            icon: "error",
            timer: 3000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            title: "Deducción registrado!",
            icon: "success",
            timer: 3000,
          });
          update();
        }
        setOpenModal(false);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
  const nameValue = (e) => {
    let empleadoName = empleados.data.find(
      (x) => x.idEmpleados == e.target.value
    );
    setNombreEmpleado(empleadoName.nombres);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let empleadoName = empleados.data.find((x) => x.idEmpleados == idEmpleado);
    setNombreEmpleado(empleadoName.nombres);
    const datos = {
      id_empleado: idEmpleado,
      nombres: nombreEmpleado,
      deducciones: deduccion,
    };
    mutation.mutate(datos);
  };

  if (empleados.isLoading || deducciones.isLoading) {
    return <></>;
  }

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className={
          "flex items-center text-sm border-2 border-DarkBlue p-2 rounded-lg font-bold hover:bg-DarkBlue hover:bg-opacity-70 hover:text-white"
        }
      >
        {
          <>
            Añadir deduccion a empleado <FaPlus className="text-xl" />
          </>
        }
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
              Ingrese los datos de la Bonificación
            </h2>
            <div className="flex flex-col items-center gap-4">
              <select
                className="w-full border-t-2 border-white p-3 flex justify-end gap-3"
                name=""
                value={idEmpleado}
                onChange={(e) => {
                  setIdEmpleado(e.target.value);
                  nameValue(e);
                }}
                id=""
              >
                <option value="none">Seleccione</option>
                {empleados.data.error
                  ? ""
                  : empleados.data &&
                    empleados.data.map((empleado) => (
                      <option
                        key={empleado.idEmpleados}
                        value={empleado.idEmpleados}
                      >
                        {empleado.nombres}
                      </option>
                    ))}
              </select>
              <select
                className="w-full border-t-2 border-white p-3 flex justify-end gap-3"
                name=""
                value={deduccion}
                onChange={(e) => setDeduccion(e.target.value)}
                id=""
              >
                <option value="none">Seleccione</option>
                {deducciones.data.error
                  ? ""
                  : deducciones.data &&
                    deducciones.data.map((dedu) => (
                      <option
                        key={dedu.iddeducciones}
                        value={dedu.descripcion_deduccion}
                      >
                        {dedu.descripcion_deduccion}
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
