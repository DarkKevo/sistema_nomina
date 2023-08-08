import Bancos from "./Bancos";
import Deducciones from "./Deducciones/Deducciones";
import Bonificaciones from "./Bonificaciones/Bonificaciones";

export default function Pagos() {
  return (
    <div className="w-full py-10 flex flex-col items-end justify-start gap-20">
      <Bancos />
      <Deducciones />
      <Bonificaciones/>
    </div>
  );
}
