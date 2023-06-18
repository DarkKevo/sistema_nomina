import { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  FaTimes,
  FaBars,
  FaUserTie,
  FaMoneyBillAlt,
  FaCity,
  FaUsers,
  FaDollarSign,
} from "react-icons/fa";
export default function Dashboard() {
  const [open, setOpen] = useState("-left-[202px]");

  const styles = {
    iconsList: "text-3xl",
    listStyle: `w-full pb-3 text-center flex items-center justify-start gap-3 cursor-pointer ${
      open == "left-0" && "border-b-2"
    } border-black border-opacity-30`,
  };

  const icons = {
    bars: (
      <FaBars
        className="text-white absolute top-6 right-3 text-3xl"
        onClick={() => {
          setOpen("left-0");
        }}
      />
    ),
    close: (
      <FaTimes
        className="text-white absolute top-6 right-3 text-3xl"
        onClick={() => {
          setOpen("-left-[202px]");
        }}
      />
    ),
    cargos: <FaUserTie className={styles.iconsList} />,
    salarios: <FaMoneyBillAlt className={styles.iconsList} />,
    departamentos: <FaCity className={styles.iconsList} />,
    empleados: <FaUsers className={styles.iconsList} />,
    deducciones: <FaDollarSign className={styles.iconsList} />,
  };

  const items = [
    { name: 'Cargos', icon: icons.cargos },
    { name: 'Salarios', icon: icons.salarios },
    { name: 'Departamentos', icon: icons.departamentos },
    { name: 'Empleados', icon: icons.empleados },
    { name: 'Deducciones', icon: icons.deducciones },
  ];

  return (
    <div className="font-poppins flex min-h-screen">
      <div className="w-1/6">
        <div
          className={
            open +
            " fixed text-gray-400 w-64 top-0 p-4 bg-LightBlue transition-all duration-500 h-screen"
          }
        >
          {open == "-left-[202px]" ? icons.bars : icons.close}
          <img src="../public/logo_transparent.png" alt="" />
          <ul className=" flex flex-col gap-9 items-center font-extrabold text-lg">
            {items.map((item) => (
              <li className={styles.listStyle}>{item.icon}{item.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
