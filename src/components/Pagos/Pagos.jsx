import Bancos from "./Bancos";
import Files from "./Files";
import Deducciones from "./Deducciones/Deducciones";
import Vacaciones from "./Vacaciones/Vacaciones";
import Bonificaciones from "./Bonificaciones/Bonificaciones";
import Registro from './Registro/Registro'

export default function Pagos() {
  return (
    <div className="w-full py-10 flex flex-col items-end justify-start gap-20">
      <Bancos />
      <Files />
      <Deducciones />
      <Vacaciones/>
      <Bonificaciones/>
      <Registro />
    </div>
  );
}
