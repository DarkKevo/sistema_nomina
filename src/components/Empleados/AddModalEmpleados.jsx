import { useState, useContext } from "react";
import { useMutation, useQuery } from "react-query";
import { FaPlus, FaRegEdit } from "react-icons/fa";
import Swal from "sweetalert2";

export default function AddModalEmpleados({ idEmpleado, isEdit, update }) {
  //estados para el fetch
  const [cedula, setCedula] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [fechaNacimiento, setFecha] = useState("");
  const [direccion, setDireccion] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [cargo, setCargo] = useState("none");
  const [departamento, setDepartamento] = useState("none");
  const [cuenta, setCuenta] = useState("");
  const [estado, setEstado] = useState("none");
  const [openModal, setOpenModal] = useState(false);

  const mutation = useMutation(
    (datos) => {
      const res = fetch(
        isEdit
          ? "http://localhost:3000/EditarEmpleado"
          : "http://localhost:3000/RegistrarEmpleado",
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
        if (data.ok !== true) {
          Swal.fire({
            title: "Datos incorrectos",
            icon: "error",
            timer: 3000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            title: isEdit
              ? "Informacion de empleado editada"
              : "Empleado registrado!",
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
  const cargos = useQuery("cargos", () =>
    fetch("http://localhost:3000/ListarCargo").then((res) => res.json())
  );
  const departamentos = useQuery("departamentos", () =>
    fetch("http://localhost:3000/ListarDepartamento").then((res) => res.json())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = isEdit
      ? {
          cedula: cedula,
          nombres: nombres,
          apellidos: apellidos,
          fecha_nacimiento: fechaNacimiento,
          direccion: direccion,
          correo: correo,
          telefono: telefono,
          codigo_cargo: parseInt(cargo),
          codigo_departamento: parseInt(departamento),
          numero_cuenta: cuenta,
          estado: estado,
          idEmpleados: idEmpleado,
        }
      : {
          cedula: cedula,
          nombres: nombres,
          apellidos: apellidos,
          fecha_nacimiento: fechaNacimiento,
          direccion: direccion,
          correo: correo,
          telefono: telefono,
          codigo_cargo: parseInt(cargo),
          codigo_departamento: parseInt(departamento),
          codigo_empresa: 1,
          numero_cuenta: cuenta,
          estado: estado,
        };

    mutation.mutate(data);
  };

  if (departamentos.isLoading || cargos.isLoading) {
    return <span>Cargando...</span>;
  }

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className={
          isEdit
            ? "flex items-center"
            : "flex items-center text-sm border-2 border-DarkBlue p-2 rounded-lg font-bold hover:bg-DarkBlue hover:bg-opacity-70 hover:text-white"
        }
      >
        {isEdit ? (
          <FaRegEdit />
        ) : (
          <>
            Añadir Empleado <FaPlus className="text-xl" />
          </>
        )}
      </button>
      <div
        className={`${
          openModal ? "grid" : "hidden"
        } fixed place-items-center top-0 left-0 w-full h-screen bg-black bg-opacity-80 z-10`}
      >
        <div
          className={`grid fixed bg-DarkBlue right-5 w-3/4 h-3/4 place-items-center z-10 rounded-lg text-lg`}
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
                placeholder="Telefono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
              {cargos.data && (
                <select
                  value={cargo}
                  className="p-3 rounded w-1/4"
                  name=""
                  id=""
                  onChange={(e) => setCargo(e.target.value)}
                >
                  <option value="none"> Seleccione el cargo</option>
                  {cargos.data.error
                    ? ""
                    : cargos.data &&
                      cargos.data.map((cargo) => (
                        <option key={cargo.idcargos} value={cargo.idcargos}>
                          {cargo.cargo}
                        </option>
                      ))}
                </select>
              )}
              <select
                value={departamento}
                className="p-3 rounded w-1/4"
                onChange={(e) => setDepartamento(e.target.value)}
              >
                <option value="none"> Seleccione el departamento</option>
                {departamentos.data.error
                  ? ""
                  : departamentos.data &&
                    departamentos.data.map((departamento) => (
                      <option
                        key={departamento.iddepartamentos}
                        value={departamento.iddepartamentos}
                      >
                        {departamento.departamento}
                      </option>
                    ))}
              </select>

              <input
                className="p-3 rounded w-1/4"
                type="text"
                name=""
                id=""
                value={cuenta}
                onChange={(e) => setCuenta(e.target.value)}
                placeholder="Ingrese su número de cuenta"
              />
              <select
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                className="p-3 rounded w-1/4"
                id=""
              >
                <option value="none">seleccione</option>
                <option value="activo">activo</option>
                <option value="inactivo">inactivo</option>
              </select>
            </div>
            <div className="w-full border-t-2 border-white p-3 flex justify-end gap-3">
              <input
                className="bg-white bg-opacity-90 border-2 border-black font-bold w-1/2 p-2 rounded cursor-pointer"
                type="submit"
                value="Enviar"
              />
              <input
                className="bg-white bg-opacity-90 border-2 border-black font-bold w-1/2 p-2 rounded cursor-pointer"
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
