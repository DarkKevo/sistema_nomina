import { useState } from "react";
import { Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
export default function Dashboard() {
  const [open, setOpen] = useState("-left-[202px]");
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
  };
  return (
    <div className="flex min-h-screen">
      <div className="w-1/6">
        <div
          className={
            open + " fixed w-64 top-0 bg-LightBlue transition-all duration-500 h-screen"
          }
        >
          {open == "-left-[202px]" ? icons.bars : icons.close}
          <img src="public\logo_transparent.png" alt="" />
          <ul>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
          </ul>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
