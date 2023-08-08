import Files from "./Files/Files";
import Registro from "./Registro/Registro";

export default function Nomina() {
  return (
    <div className="w-full py-10 flex flex-col items-center justify-start gap-10">
      <Files />
      <Registro/>
    </div>
  );
}
