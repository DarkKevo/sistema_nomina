import { useEffect, useState } from "react";
import { FaRegTrashAlt, FaRegEdit, FaCity, FaPlus } from "react-icons/fa";
import AddModal from "./AddModal";
import { useQuery } from "react-query";

export default function Departamentos() {
  const [openModal, setOpenModal] = useState(false);

  const { data } = useQuery("repoData", () =>
      fetch("http://localhost:3000/ListarDepartamento").then((res) => res.json())
      
    );
  let tableStyle = "border-b-2 text-center drop-shadow-xl p-5";
  return (
    <div className="w-full py-10 flex flex-col items-center justify-start gap-10">
      <nav className="w-3/4 rounded-md flex justify-between">
        <h1 className="flex gap-2 items-center text-sm font-bold">
          <FaCity className="text-2xl" /> Departamentos de la empresa
        </h1>
        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center text-sm border-2 border-DarkBlue p-2 rounded-lg font-bold hover:bg-DarkBlue hover:bg-opacity-70 hover:text-white"
        >
          Añadir Departamento <FaPlus className="text-xl" />
        </button>
      </nav>
      <table className=" border-collapse border-2">
        <thead>
          <tr>
            <th
              className={tableStyle + " bg-DarkBlue bg-opacity-70 text-white"}
            >
              ID
            </th>
            <th
              className={tableStyle + " bg-DarkBlue bg-opacity-70 text-white"}
            >
              Departamento
            </th>
            <th
              className={tableStyle + " bg-DarkBlue bg-opacity-70 text-white"}
            >
              ACTION
            </th>
          </tr>
        </thead>
        {data && (
          <tbody>
            {data.map((departamento) => (
              <tr key={departamento.iddepartamentos}>
                <td className={tableStyle}>{departamento.iddepartamentos}</td>
                <td className={tableStyle}>{departamento.departamento}</td>
                <td className={tableStyle}>
                  <div className="flex items-center justify-center text-2xl gap-3">
                    <button>
                      <FaRegTrashAlt />
                    </button>
                    <button>
                      <FaRegEdit />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      <AddModal openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
}
