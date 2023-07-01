import { useState } from "react";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
export default function Register() {
  let InputStyle =
    "bg-transparent p-3 w-full text-2xl lg:text-lg lg:p-2 text-white border-2 border-white rounded-lg";

  //estados para el fetch
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");

  const mutation = useMutation(
    (data) => {
      const res = fetch("http://localhost:3000/newUser", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      return res;
    },
    {
      onSuccess: (data) => {
        data.ok !== true ? (
          Swal.fire({
            title: "Datos incorrectos",
            icon: "error",
            timer: 3000,
            showConfirmButton: false,
          })
        ) : (
          <Navigate to={"/sesion"} />
        );
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const datos = {
      nombre:nombre,
      apellido:apellido,
      user:usuario,
      pass:contraseña
    }
    mutation.mutate(datos)
  };

  return (
    <div className="font-poppins bg-LightBlue min-h-screen flex flex-col justify-center items-center">
      <img
        className="w-1/3 lg:w-[12%]"
        src="public\logo_transparent.png"
        alt=""
      />
      <form
        className="flex flex-col items-center bg-DarkBlue p-7 rounded-lg gap-5"
        onSubmit={(e)=>handleSubmit(e)}
      >
        <h1 className="text-center text-3xl lg:text-xl m-3 lg:m-0 text-white">
          Registro
        </h1>
        <input
          className={InputStyle}
          type="text"
          name=""
          value={nombre}
          placeholder="Ingrese su Nombre"
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          className={InputStyle}
          type="text"
          name=""
          value={apellido}
          placeholder="Ingrese su Apellido"
          onChange={(e) => setApellido(e.target.value)}
        />
        <input
          className={InputStyle}
          type="text"
          name=""
          value={usuario}
          placeholder="Ingrese su Usuario"
          onChange={(e) => setUsuario(e.target.value)}
        />
        <input
          className={InputStyle}
          type="password"
          name=""
          value={contraseña}
          placeholder="Ingrese su Contraseña"
          onChange={(e) => setContraseña(e.target.value)}
        />
        <button
          className={InputStyle + " w-min text-white bg-white bg-opacity-20"}
          type="submit"
        >
          Ingresar
        </button>
        <p className="text-white text-sm">
          ¿Aún no tienes una cuenta?,
          <Link to={"/"}>
            {" "}
            <strong>Inicia Sesión AQUI</strong>
          </Link>
        </p>
      </form>
    </div>
  );
}
