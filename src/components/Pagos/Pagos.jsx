import Bancos from "./Bancos";
import Files from "./Files";
import Deducciones from "./Deducciones";

export default function Pagos() {
  return (
    <div className="w-full py-10 flex flex-col items-end justify-start gap-10">
      <Bancos />
      <Files />
      <Deducciones />
    </div>
  );
}
