import React from "react";
import { Link, useNavigate } from "react-router-dom";

function BottomBar({ children }) {
  return (
    <div className="bg-dblue flex items-center w-full max-h-[4.4rem] px-6 rounded-t-xl mobilebar  md:hidden">
      <ul className="w-full flex justify-center items-center gap-1  relative text-white">
        {children}
      </ul>
    </div>
  );
}

function BottombarItem({ text, icon, active, alert, onClick }) {
  const navigate = useNavigate();

  const handleClick = () => {
    onClick();
  };

  return (
    <li
      className={`w-full ${active ? "bg-red-500 rounded-md  " : "text-white"}`}
      onClick={handleClick}
    >
      <a
        className="flex relative flex-col justify-center items-center text-center py-4"
        href={`/${text.toLowerCase()}`}
      >
        <span className="cursor-pointer">{icon}</span>
        {alert && (
          <div className="absolute top-4 right-4 w-2 h-2 rounded bg-red-400" />
        )}
      </a>
    </li>
  );
}
export default BottomBar;
export { BottombarItem };
