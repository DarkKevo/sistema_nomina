import { useEffect, useState } from "react";
import { FaRegTrashAlt, FaRegEdit, FaMoneyBillAlt, FaPlus } from "react-icons/fa";
import AddModal from "./AddModal";
import { useQuery } from "react-query";

export default function Cargos() {
  const [openModal, setOpenModal] = useState(false);

  const { data } = useQuery("repoData", () =>
      fetch("http://localhost:3000/ListarSalario").then((res) => res.json())
      
    );
  let tableStyle = "border-b-2 text-center drop-shadow-xl p-5";
  return (
    <div className="w-full py-10 flex flex-col items-center justify-start gap-10">
      <nav className="w-3/4 rounded-md flex justify-between">
        <h1 className="flex gap-2 items-center text-sm font-bold">
          <FaMoneyBillAlt className="text-2xl" /> Salarios de la empresa
        </h1>
        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center text-sm border-2 border-DarkBlue p-2 rounded-lg font-bold hover:bg-DarkBlue hover:bg-opacity-70 hover:text-white"
        >
          Añadir Salario <FaPlus className="text-xl" />
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
              MONTO
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
            {data.map((salario) => (
              <tr key={salario.idsalario}>
                <td className={tableStyle}>{salario.idsalario}</td>
                <td className={tableStyle}>{salario.monto_salario}</td>
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
