import { useContext, useState } from "react";
import { useMutation } from "react-query";
import { Link,useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { sesion } from "../context/ValidateSesion";
export default function Login() {
  let InputStyle =
    "bg-transparent p-3 w-full text-2xl lg:text-lg lg:p-2 text-white border-2 border-white rounded-lg";

  //estados para el fetch
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate()

  const { setToken } = useContext(sesion);
  const mutation = useMutation(
    (data) => {
      const res = fetch("http://localhost:3000/loginUser", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      }).then((x) => x.json());
      return res;
    },
    {
      onSuccess: (data) => {
        if (data.Status !== 200) {
          Swal.fire({
            title: "Datos incorrectos",
            icon: "error",
            timer: 3000,
            showConfirmButton: false,
          });
        } else {
          setToken(data.token)
          navigate('/sesion/inicio')
        }
      },
      onError: (error) => console.log(error),
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      user,
      pass,
    };
    mutation.mutate(data);
  };
  return (
    <div className="font-poppins bg-LightBlue min-h-screen flex flex-col justify-center items-center">
      <img
        className="w-1/2 lg:w-[12%]"
        src="public\logo_transparent.png"
        alt=""
      />
      <form
        className="flex flex-col items-center bg-DarkBlue p-7 rounded-lg gap-5"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1 className="text-center text-3xl lg:text-xl  m-3 text-white">
          Iniciar Sesión
        </h1>
        <input
          className={InputStyle}
          type="text"
          name=""
          value={user}
          placeholder="👤 Ingrese el usuario"
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          className={InputStyle}
          type="password"
          name=""
          value={pass}
          placeholder="🔑 Ingrese su contraseña"
          onChange={(e) => setPass(e.target.value)}
        />
        <button
          className={InputStyle + " w-min text-white bg-white bg-opacity-20"}
          type="submit"
        >
          Ingresar
        </button>
        <p className="text-white text-sm">
          ¿Aún no tienes una cuenta?,
          <Link to={"/registro"}>
            {" "}
            <strong>Registrate AQUI</strong>
          </Link>
        </p>
      </form>
    </div>
  );
}
