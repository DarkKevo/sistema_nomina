import { useContext, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { sesion } from "../context/ValidateSesion";
export default function Login() {
  let InputStyle =
    "bg-transparent p-3 w-full text-2xl lg:text-lg lg:p-2 text-white border-2 border-white rounded-lg";

  //estados para el fetch
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const [cedula, setCedula] = useState("V-");
  const [pagos, setPagos] = useState([]);
  const { setToken, setLoader } = useContext(sesion);

  useEffect(() => {}, [pagos]);

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
          setToken(data.token);
          window.localStorage.setItem("token", data.token);
          navigate("/sesion/inicio");
        }
      },
      onError: (error) => {
        console.log(error);
        Swal.fire({
          title: "Datos incorrectos",
          icon: "error",
          timer: 3000,
          showConfirmButton: false,
        });
      },
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

  const mutationPago = useMutation(
    (datos) => {
      const res = fetch("http://localhost:3000/FiltrarPagos", {
        method: "POST",
        body: JSON.stringify(datos),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      }).then((x) => x.json());
      return res;
    },
    {
      onSuccess: (data) => {
        if (data) {
          setPagos(data);
        }
      },
    }
  );

  const buscarPagos = (e) => {
    e.preventDefault();
    const data = {
      cedula: `${cedula}`,
    };
    console.log(data);
    mutationPago.mutate(data);
  };

  if (mutationPago.isLoading) {
    setLoader(true);
  }
  if (mutationPago.isSuccess) {
    setLoader(false);
  }

  return (
    <div className="font-poppins bg-LightBlue min-h-screen flex  justify-center items-center">
      <div className="w-1/2 p-16 min-h-screen grid content-center">
        <div className="bg-DarkBlue  p-10 rounded-lg min-h-[80vh]">
          <h1 className="font-bold text-xl my-5 text-white">Ver mis pagos</h1>
          <form
            className="flex w-full justify-between"
            onSubmit={(e) => {
              buscarPagos(e);
            }}
          >
            <div className="w-full flex border-2 border-gray-400  rounded-lg">
              <label
                htmlFor=""
                className="w-1/2 rounded-lg text-white p-3 bg-LightBlue"
              >
                Ingrese su cedula:{" "}
              </label>
              <input
                type="text"
                className="w-full p-2"
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
              />
            </div>
            <input
              type="submit"
              value="enviar"
              className="text-slate-400 ml-2 p-3 rounded border-2 border-slate-400 cursor-pointer hover:bg-LightBlue hover:text-white"
            />
          </form>
          {pagos && !pagos.error ? (
            <div>
              {pagos.map((pago) => (
                <div className="bg-white m-3 p-3 rounded-lg">
                  <p>Nombre: {pago.nombre}</p>
                  <p>Fecha: {pago.fecha}</p>
                  <p>Cuenta: {pago.cuentn}</p>
                  <p>Descando: {pago.pagoDiasDescanso}</p>
                  <p>Extras: {pago.pagoDiasExtras}</p>
                  <p>Laborales: {pago.pagoDiasLaborales}</p>
                  <p>Total: {pago.pagoTotal}</p>
                </div>
              ))}
            </div>
          ) :(
            <p className="text-3xl text-white text-center my-10">El empledo no tiene pagos</p>
          )}
        </div>
      </div>
      <div className="w-1/2 flex flex-col  justify-center items-center">
        <img
          className="w-1/2 lg:w-1/4"
          src="public\logo_transparent.png"
          alt=""
        />
        <form
          className="w-1/2 flex flex-col items-center bg-DarkBlue p-7 rounded-lg gap-5"
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
    </div>
  );
}
