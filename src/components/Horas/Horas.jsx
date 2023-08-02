import { useMutation, useQuery } from "react-query";
import AddModalHoras from "./AddModalHoras";
import { FaRegTrashAlt, FaUserTie } from "react-icons/fa";
import Swal from "sweetalert2";

export default function Horas() {

  const horas = useQuery("horas", () =>
    fetch("http://localhost:3000/listarHoras").then((res) => res.json())
  );
  let tableStyle = "border-b-2 text-center drop-shadow-xl p-5";

  if (horas.isLoading) {
    return <span>Cargando...</span>;
  }

  const fecha_a = (fecha) =>{
    const f = new Date(fecha)
    const fa = `${f.getDate()}-`+ `${f.getMonth() + 1}-`+`${f.getFullYear()}`;
    return(fa)
  }

  return (
    <div className="w-full py-10 flex flex-col items-center justify-start gap-10">
      <nav className="w-3/4 rounded-md flex justify-between">
        <h1 className="flex gap-2 items-center text-sm font-bold">
          <FaUserTie className="text-2xl" /> Horas trabajadas en la empresa
        </h1>
        <AddModalHoras isEdit={false} update={horas.refetch} />
      </nav>
      {horas.data.error ? (
        <>No hay</>
      ) : (
        <table className=" border-collapse border-2">
          <thead>
            <tr>
              <th
                className={tableStyle + " bg-DarkBlue bg-opacity-70 text-white"}
              >
                NOMBRES
              </th>
              <th
                className={tableStyle + " bg-DarkBlue bg-opacity-70 text-white"}
              >
                APELLIDOS
              </th>
              <th
                className={tableStyle + " bg-DarkBlue bg-opacity-70 text-white"}
              >
                HORAS LABORADAS
              </th>
              <th
                className={tableStyle + " bg-DarkBlue bg-opacity-70 text-white"}
              >
                HORAS EXTRAS
              </th>
              <th
                className={tableStyle + " bg-DarkBlue bg-opacity-70 text-white"}
              >
                FECHA
              </th>
            </tr>
          </thead>
          {horas.data && (
            <tbody>
              {horas.data.map((hora) => (
                <tr key={hora.idhoras}>
                  <td className={tableStyle}>{hora.nombres}</td>
                  <td className={tableStyle}>{hora.apellidos}</td>
                  <td className={tableStyle}>{hora.horas_laboradas}</td>
                  <td className={tableStyle}>{hora.horas_extras}</td>
                  <td className={tableStyle}>{fecha_a(hora.fecha)}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      )}
    </div>
  );
}
