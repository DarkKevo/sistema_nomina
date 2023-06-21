import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
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
    listStyle: `w-full pb-3 text-center cursor-pointer md:border-b-2 md:border-black md:border-opacity-30 ${
      open == "left-0" && "border-b-2"
    } border-black border-opacity-30`,
  };

  const icons = {
    bars: (
      <FaBars
        className="text-white absolute top-6 right-3 text-3xl cursor-pointer md:hidden"
        onClick={() => {
          setOpen("left-0");
        }}
      />
    ),
    close: (
      <FaTimes
        className="text-white absolute top-6 right-3 text-3xl cursor-pointer md:hidden"
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
    { name: "Cargos", icon: icons.cargos },
    { name: "Salarios", icon: icons.salarios },
    { name: "Departamentos", icon: icons.departamentos },
    { name: "Empleados", icon: icons.empleados },
    { name: "Deducciones", icon: icons.deducciones },
  ];

  return (
    <div className="font-poppins flex min-h-screen">
      <div className="w-1/6 z-10">
        <div
          className={
            open +
            " fixed text-gray-400 w-64 top-0 p-4 bg-LightBlue transition-all duration-500 h-screen md:left-0"
          }
        >
          {open == "-left-[202px]" ? icons.bars : icons.close}
          <img src="../public/logo_transparent.png" alt="" />
          <ul className=" flex flex-col gap-9 items-center font-extrabold text-lg">
            {items.map((item) => (
              <Link
                key={item.name}
                className={styles.listStyle}
                to={`/sesion/${item.name.toLowerCase()}`}
                onClick={() => {
                  setOpen("-left-[202px]");
                }}
              >
                <li className="flex items-center justify-start gap-3">
                  {item.icon}
                  {item.name}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
