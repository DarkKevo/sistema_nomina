import { useMutation, useQuery } from "react-query";
import AddModalPagos from "./AddModalPagos";
import ModalConfiguracion from "./ModalConfiguracion";
import { FaRegTrashAlt, FaUserTie } from "react-icons/fa";
import Swal from "sweetalert2";
import ModalTXT from "./ModalTXT";
import { toast, Toaster } from "react-hot-toast";

export default function Pagos() {
  const mutationBanco = useMutation(
    (data) => {
      const res = fetch("http://localhost:3000/EliminarBancos", {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      return res;
    },
    {
      onSuccess: (data) => {
        console.log(data);
        if (data.ok !== true) {
          Swal.fire({
            title: "Datos incorrectos",
            icon: "error",
            timer: 3000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            title: "Cuenta Eliminada!",
            icon: "success",
            timer: 3000,
          });
          bancos.refetch();
        }
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const mutationFile = useMutation((datos) => {
    const res = fetch("http://localhost:3000/EliminarSetup", {
      method: "DELETE",
      body: JSON.stringify(datos),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    return res;
  },
  {
    onSuccess:(data)=>{
      if(data.ok){
        toast.success('configuracion eliminada!')
        files.refetch()
      }
    }
  });

  const handleDelete = (e, id) => {
    e.preventDefault();
    const data = {
      idbancos: id,
    };
    mutationBanco.mutate(data);
  };

  const handleDeleteFile = (id) => {
    const data = {
      idfile : id
    }

    mutationFile.mutate(data)
  };

  const bancos = useQuery("bancos", () =>
    fetch("http://localhost:3000/ListarBanco").then((res) => res.json())
  );

  const files = useQuery("files", () =>
    fetch("http://localhost:3000/Listarsetup").then((res) => res.json())
  );

  let tableStyle = "border-b-2 text-center drop-shadow-xl p-5";
  if (bancos.isLoading || files.isLoading) {
    return <span>Cargando...</span>;
  }
  return (
    <div className="w-full py-10 flex flex-col items-center justify-start gap-10">
      <div>
        <nav className="w-3/4 rounded-md flex justify-between">
          <h1 className="flex gap-2 items-center text-sm font-bold">
            <FaUserTie className="text-2xl" /> Bancos en la empresa
          </h1>
          <AddModalPagos isEdit={false} update={bancos.refetch} />
        </nav>
        {bancos.data.error ? (
          <>No hay</>
        ) : (
          <table className=" border-collapse border-2">
            <thead>
              <tr>
                <th
                  className={
                    tableStyle + " bg-DarkBlue bg-opacity-70 text-white"
                  }
                >
                  CODIGO
                </th>
                <th
                  className={
                    tableStyle + " bg-DarkBlue bg-opacity-70 text-white"
                  }
                >
                  NOMBRE
                </th>
                <th
                  className={
                    tableStyle + " bg-DarkBlue bg-opacity-70 text-white"
                  }
                >
                  NUMERO DE CUENTA
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
            {bancos.data && (
              <tbody>
                {bancos.data.map((banco) => (
                  <tr key={banco.idbancos}>
                    <td className={tableStyle}>{banco.codigo}</td>
                    <td className={tableStyle}>{banco.nombre}</td>
                    <td className={tableStyle}>{banco.cuenta}</td>
                    <td className="border-b-2">
                      <div className="flex items-center justify-center text-2xl gap-3">
                        <button>
                          <FaRegTrashAlt
                            onClick={(e) => handleDelete(e, banco.idbancos)}
                          />
                        </button>
                        <AddModalPagos
                          id={banco.idbancos}
                          isEdit={true}
                          update={bancos.refetch}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        )}
      </div>

      <div className="">
        <nav className="w-3/4 rounded-md flex justify-between">
          <h1 className="flex gap-2 items-center text-sm font-bold">
            <FaUserTie className="text-2xl" /> archivos para generar pagos
          </h1>
          <ModalConfiguracion bancos={bancos} refetch={files.refetch} />
        </nav>
        {files.data.error ? (
          <>No hay</>
        ) : (
          <table className=" border-collapse border-2">
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
                          <FaRegTrashAlt onClick={()=>handleDeleteFile(file.idfile)} />
                        </button>
                        <ModalTXT/>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        )}
      </div>
      <Toaster/>
    </div>
  );
}
