import React from "react";
import { Link, useNavigate } from "react-router-dom";

function MobileMenu({ children }) {
  return (
    <div className="flex shadow-md items-center w-full max-h-[4.4rem] px-6  mobilebar  sticky z-50 top-0 md:hidden">
      <ul className="w-full flex justify-center items-center gap-1  relative text-red-500">
        {children}
      </ul>
    </div>
  );
}

function MobileMenuItem({ text, icon, active, alert, onClick }) {
  const navigate = useNavigate();

  const handleClick = () => {
    onClick();
  };

  return (
    <li
      className={`w-full text-red-500 `}
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
export default MobileMenu;
export { MobileMenuItem };
