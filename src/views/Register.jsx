import { Link } from "react-router-dom";
export default function Register() {
  let InputStyle =
    "bg-transparent p-3 w-full text-2xl text-white border-2 border-white rounded-lg";
  return (
    <div className="font-poppins bg-LightBlue min-h-screen flex flex-col justify-center items-center">
      <img className="w-1/3" src="public\logo_transparent.png" alt="" />
      <form className="flex flex-col items-center bg-DarkBlue p-7 rounded-lg gap-5">
        <h1 className="text-center text-3xl m-3 text-white">Registro</h1>
        <input
          className={InputStyle}
          type="text"
          name=""
          id=""
          placeholder="Ingrese su Nombre completo"
        />
        <input
          className={InputStyle}
          type="text"
          name=""
          id=""
          placeholder="Ingrese su Cédula"
        />
        <input
          className={InputStyle}
          type="text"
          name=""
          id=""
          placeholder="Ingrese su Cargo"
        />
        <input
          className={InputStyle}
          type="text"
          name=""
          id=""
          placeholder="Ingrese su Contraseña"
        />
        <input
          className={InputStyle}
          type="text"
          name=""
          id=""
          placeholder="Ingrese su Contraseña de Nuevo"
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
