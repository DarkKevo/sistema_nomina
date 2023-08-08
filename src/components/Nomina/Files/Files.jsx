import { useQuery, useMutation } from "react-query";
import ModalTXT from "./ModalTXT";
import { toast, Toaster } from "react-hot-toast";
import ModalConfiguracion from "./ModalConfiguracion";
import { FaRegTrashAlt, FaUserTie } from "react-icons/fa";
import { sesion } from "../../../context/ValidateSesion";
import { useContext } from "react";
import Swal from "sweetalert2";

export default function Files() {
  const { setLoader } = useContext(sesion);
  let tableStyle = "border-b-2 text-center drop-shadow-xl p-5";

  const files = useQuery("files", () =>
    fetch("http://localhost:3000/Listarsetup").then((res) => res.json())
  );
  const bancos = useQuery("bancos", () =>
    fetch("http://localhost:3000/ListarBanco").then((res) => res.json())
  );
  const mutationFile = useMutation(
    (datos) => {
      const res = fetch("http://localhost:3000/EliminarSetup", {
        method: "DELETE",
        body: JSON.stringify(datos),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      return res;
    },
    {
      onSuccess: (data) => {
        if (data.ok) {
          toast.success("configuracion eliminada!");
          files.refetch();
        }
      },
    }
  );

  const handleDeleteFile = (id) => {
    Swal.fire({
      text: "¿Eliminar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((resultado) => {
      if (resultado.value) {
        const data = {
          idfile: id,
        };
        mutationFile.mutate(data);
      }
    });
  };

  if (files.isLoading || bancos.isLoading) {
    setLoader(true);
    return <></>;
  }
  if (files.isSuccess || bancos.isSuccess) {
    setLoader(false);
  }
  return (
    <>
      <div className="w-11/12 flex flex-col items-center gap-10">
        <nav className="w-3/4 rounded-md flex justify-between">
          <h1 className="flex gap-2 items-center text-sm font-bold">
            <FaUserTie className="text-2xl" /> archivos para generar pagos
          </h1>
          <ModalConfiguracion bancos={bancos} refetch={files.refetch} />
        </nav>
        {files.data.error ? (
          <>No hay</>
        ) : (
          <table className="w-3/4 border-collapse border-2">
            <thead>
              <tr>
                <th
                  className={
                    tableStyle + " bg-DarkBlue bg-opacity-70 text-white"
                  }
                >
                  Banco
                </th>
                <th
                  className={
                    tableStyle + " bg-DarkBlue bg-opacity-70 text-white"
                  }
                >
                  Codigo Banco
                </th>
                <th
                  className={
                    tableStyle + " bg-DarkBlue bg-opacity-70 text-white"
                  }
                >
                  Separador
                </th>
                <th
                  className={
                    tableStyle + " bg-DarkBlue bg-opacity-70 text-white"
                  }
                >
                  Tipo de archivo
                </th>
                <th
                  className={
                    tableStyle + " bg-DarkBlue bg-opacity-70 text-white"
                  }
                >
                  columnas
                </th>
                <th
                  className={
                    tableStyle + " bg-DarkBlue bg-opacity-70 text-white"
                  }
                >
                  ACTION
                </th>
              </tr>
            </thead>
            {files.data && (
              <tbody>
                {files.data.map((file) => (
                  <tr key={file.idfile}>
                    <td className={tableStyle}>{file.Banco}</td>
                    <td className={tableStyle}>{file.codigo}</td>
                    <td className={tableStyle}>{file.separadores}</td>
                    <td className={tableStyle}>{file.tipo_file}</td>
                    <td className={tableStyle}>{file.columnasfile}</td>
                    <td className="border-b-2">
                      <div className="flex items-center justify-center text-2xl gap-3">
                        <button>
                          <FaRegTrashAlt
                            onClick={() => handleDeleteFile(file.idfile)}
                          />
                        </button>
                        <ModalTXT id={file.idfile} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        )}
      </div>
      <Toaster />
    </>
  );
}
