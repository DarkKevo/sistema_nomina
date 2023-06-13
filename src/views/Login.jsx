import {Link} from 'react-router-dom'
export default function Login() {
  let InputStyle =
    "bg-transparent p-3 w-full text-2xl border-2 border-white rounded-lg";
  return (
    <div className="font-poppins bg-LightBlue min-h-screen flex justify-center items-center">
      <form className="flex flex-col items-center bg-DarkBlue p-7 rounded-lg gap-5">
        <h1 className="text-center text-3xl m-3 text-white">Iniciar Sesión</h1>
        <input
          className={InputStyle}
          type="text"
          name=""
          id=""
          placeholder="👤 Ingrese el usuario"
        />
        <input
          className={InputStyle}
          type="text"
          name=""
          id=""
          placeholder="🔑 Ingrese su contraseña"
        />
        <button
          className={InputStyle + " w-1/2 text-white bg-white bg-opacity-20"}
          type="submit"
        >
          Ingresar
        </button>
        <p className="text-white text-sm">¿Aún no tienes una cuenta?,<Link to={'/registro'}> <strong>Inicia Sesión AQUI</strong></Link></p>
      </form>
    </div>
  );
}
