import { useEffect, useState } from "react";
import { FaRegTrashAlt, FaRegEdit, FaUserTie, FaPlus } from "react-icons/fa";

export default function Cargos() {
  const handleChange = () => {
    fetch("http://localhost:3000/ListarCargo")
      .then((response) => response.json())
      .then((data) => {
        setCargos(data);
      });
  };
  const [cargos, setCargos] = useState([]);
  useEffect(() => {
    handleChange();
  }, []);
  let tableStyle = "border-b-2 text-center drop-shadow-xl p-5";
  return (
    <div className="w-full py-10 flex flex-col items-center justify-start gap-10">
      <nav className="w-3/4 rounded-md flex justify-between">
        <h1 className="flex gap-4 items-center text-2xl font-bold">
          <FaUserTie /> Cargos en la empresa
        </h1>
        <button className="flex gap-4 items-center text-sm border-2 border-DarkBlue p-2 rounded-lg font-bold hover:bg-DarkBlue hover:bg-opacity-70 hover:text-white">
          Añadir cargo <FaPlus />
        </button>
      </nav>
      <table className="w-3/4 border-collapse border-2">
        <thead>
          <tr>
            <th className={tableStyle + " bg-DarkBlue bg-opacity-70"}>
              NOMBRE
            </th>
            <th className={tableStyle + " bg-DarkBlue bg-opacity-70"}>
              MONTO
            </th>
            <th className={tableStyle + " bg-DarkBlue bg-opacity-70"}>
              ACTION
            </th>
          </tr>
        </thead>
        {cargos && (
          <tbody>
            {cargos.map((cargo) => (
              <tr key={cargo.id}>
                <td className={tableStyle}>{cargo.nombre}</td>
                <td className={tableStyle}>{cargo.monto}</td>
                <td className={tableStyle + ' flex gap-5 items-center justify-center text-2xl'}>
                  <button>
                    <FaRegTrashAlt />
                  </button>
                  <button>
                    <FaRegEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}
