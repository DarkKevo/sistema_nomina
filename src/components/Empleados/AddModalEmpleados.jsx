import { useState } from "react";
import { useMutation } from "react-query";
import { FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";

export default function AddModalEmpleados() {
  //estados para el fetch
  const [cedula, setCedula] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [fechaNacimiento, setFecha] = useState("");
  const [direccion, setDireccion] = useState("");
  const [correo, setCorreo] = useState("");
  const [codigoCargo, setCodigoCargo] = useState("");
  const [codigoDepartamento, setCodigoDepartamento] = useState("");
  const [codigoDeduccion, setCodigoDeduccion] = useState("");
  const [codigoEmpresa, setCodigoEmpresa] = useState("");
  const [estado, setEstado] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const mutation = useMutation(
    (datos) => {
      const res = fetch("http://localhost:3000/RegistrarEmpleado", {
        method: "POST",
        body: JSON.stringify(datos),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
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
              title: "Departamento registrado!",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const datos = {
      cedula: cedula,
      nombres: nombres,
      apellidos: apellidos,
      fecha_nacimiento: fechaNacimiento,
      direccion: direccion,
      correo: correo,
      codigo_cargo: codigoCargo,
      codigo_departamento: codigoDepartamento,
      codigo_deduccion: codigoDeduccion,
      codigo_empresa: codigoEmpresa,
      estado: estado
    }
    mutation.mutate(datos);
  };
  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="flex items-center text-sm border-2 border-DarkBlue p-2 rounded-lg font-bold hover:bg-DarkBlue hover:bg-opacity-70 hover:text-white"
      >
        Añadir Empleado <FaPlus className="text-xl" />
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
              Ingrese los datos del Empleado
            </h2>
            <div className="flex flex-wrap items-center gap-4">
              <input
                className="p-3 rounded w-1/4"
                type="text"
                name=""
                id=""
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
                placeholder="Ingrese la cedula"
              />
              <input
                className="p-3 rounded w-1/4"
                type="text"
                name=""
                id=""
                value={nombres}
                onChange={(e) => setNombres(e.target.value)}
                placeholder="Ingrese los nombres"
              />
              <input
                className="p-3 rounded w-1/4"
                type="text"
                name=""
                id=""
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
                placeholder="Ingrese los apellidos"
              />
              <input
                className="p-3 rounded w-1/4"
                type="date"
                name=""
                id=""
                value={fechaNacimiento}
                onChange={(e) => setFecha(e.target.value)}
                placeholder="Ingrese su fecha de nacimiento"
              />
              <input
                className="p-3 rounded w-1/4"
                type="text"
                name=""
                id=""
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                placeholder="Ingrese su dirección"
              />
              <input
                className="p-3 rounded w-1/4"
                type="email"
                name=""
                id=""
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="Ingrese su correo"
              />
              <input
                className="p-3 rounded w-1/4"
                type="text"
                name=""
                id=""
                value={codigoCargo}
                onChange={(e) => setCodigoCargo(e.target.value)}
                placeholder="Ingrese su cargo (codigo)"
              />
              <input
                className="p-3 rounded w-1/4"
                type="text"
                name=""
                id=""
                value={codigoDepartamento}
                onChange={(e) => setCodigoDepartamento(e.target.value)}
                placeholder="Ingrese su departamento (codigo)"
              />
              <input
                className="p-3 rounded w-1/4"
                type="text"
                name=""
                id=""
                value={codigoEmpresa}
                onChange={(e) => setCodigoEmpresa(e.target.value)}
                placeholder="Ingrese su empresa (codigo)"
              />
              <select
                onChange={(e) => setEstado(e.target.value)}
                className="p-3 rounded w-1/4"
                id=""
              >
                <option value="activo">activo</option>
                <option value="inactivo">inactivo</option>
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
