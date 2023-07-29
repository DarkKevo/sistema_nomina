import { useContext, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import {
  FaTimes,
  FaBars,
  FaUserTie,
  FaMoneyBillAlt,
  FaCity,
  FaUsers,
  FaDollarSign,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";
import { sesion } from "../context/ValidateSesion";

export default function Dashboard() {
  const [open, setOpen] = useState("-left-[202px]");
  const styles = {
    iconsList: "text-xl",
    listStyle: `w-full pb-3 text-center cursor-pointer md:border-b-2 md:border-black md:border-opacity-30 ${
      open == "left-0" && "border-b-2"
    } border-black border-opacity-30`,
  };

  const {setToken} = useContext(sesion)
  const Navigate = useNavigate()
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
    Pagos: <FaMoneyBillAlt className={styles.iconsList} />,
    departamentos: <FaCity className={styles.iconsList} />,
    empleados: <FaUsers className={styles.iconsList} />,
  };

  const items = [
    { name: "Cargos", icon: icons.cargos },
    { name: "Departamentos", icon: icons.departamentos },
    { name: "Empleados", icon: icons.empleados },
    { name: "Pagos", icon: icons.Pagos },
  ];

  function logOut(){
    window.localStorage.clear()
    setToken('0')
    Navigate('/')
  }

  return (
    <div className="font-poppins flex min-h-screen">
      <div className="w-1/6 z-10">
        <div
          className={
            open +
            " fixed text-gray-400 w-64 top-0 p-4 bg-LightBlue transition-all duration-500 h-screen md:left-0 flex flex-col gap-3 items-center"
          }
        >
          {open == "-left-[202px]" ? icons.bars : icons.close}
          <img className="w-3/4" src="../public/logo_transparent.png" alt="" />
          <ul className="w-full flex flex-col gap-5 items-center font-extrabold text-md">
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
            <li className="flex items-center justify-start gap-3 hover:border-2 p-2 hover:rounded-lg hover:border-gray-400 cursor-pointer" onClick={logOut}>
              Cerrar Sesión
              <FaRegArrowAltCircleRight />
            </li>
          </ul>
          <img className="w-1/2 mt-2" src="../public/LOGO-UVM.png" alt="Logo UVM" />
        </div>
      </div>
      <Outlet />
    </div>
  );
}
