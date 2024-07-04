import React, { useState, createContext, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronFirst, ChevronLast, MoreVertical, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { closeProfile as closeProfileAction } from "../features/windows/windowSlice";
import whiteLogo from "/public/images/White-Logo.png";

const apiBase =
  import.meta.env.VITE_ENV === "development"
    ? import.meta.env.VITE_DEV_API_BASE
    : import.meta.env.VITE_PROD_API_BASE;

const SidebarContext = createContext();

function SideBar({ children }) {
  const userData = useSelector((state) => state.user.userinfo);

  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="bg-dblue sidebar hidden md:block sticky   ">
      <nav className="h-full flex flex-col bg-dblue border-r shadow-sm">
        <div className="p-2 flex justify-between items-center">
          <img
            src={whiteLogo}
            className={`overflow-hidden transition-all ${
              expanded ? "w-8" : "w-0"
            }  h-auto pt-1`}
            alt="ww logo"
          />
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="w-auto p-1.5 rounded-lg bg-transparent hover:bg-transparent text-white hover:bg-gray-100"
          >
            {expanded ? (
              <ChevronFirst className="w-5 h-5" />
            ) : (
              <ChevronLast className="w-5 h-5" />
            )}
          </button>
        </div>
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-1 mt-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-2">
          <img
            src="https://img.icons8.com/?size=100&id=23244&format=png&color=000000"
            alt="avatar"
            className="rounded-md w-8 h-8"
          />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "w-full ml-2" : "w-0 ml-0"
            }`}
          >
            <div className="leading-1 mr-2">
              <h4 className="font-semibold text-xs l text-white">
                {userData.name}
              </h4>
              <span className="text-1xs text-gray-300">
                {userData.username}
              </span>
            </div>
            <MoreVertical size={20} className="text-white" />
          </div>
        </div>
      </nav>
    </aside>
  );
}

function SidebarItem({ icon, active, text, alert, onClick }) {
  const navigate = useNavigate();

  const handleClick = () => {
    onClick();
  };

  const { expanded } = useContext(SidebarContext);
  return (
    <Link to={`/${text.toLowerCase()}`}>
      <li
        className={`relative flex items-center p-2 cursor-pointer transition-colors group ${
          active ? "bg-red-500" : "bg-transparent"
        } hover:bg-red-500 rounded-md`}
        onClick={handleClick}
      >
        {icon && (
          <span className={`${expanded ? "mr-4" : "mr-0"} text-white`}>
            {icon}
          </span>
        )}
        <span
          className={`text-white text-sm overflow-hidden ${
            expanded ? "w-full" : "w-0"
          }`}
        >
          {text}
        </span>
        {alert && (
          <div
            className={`absolute w-2 h-2 rounded bg-red-400 ${
              expanded ? "right-2" : "top-2"
            }`}
          />
        )}
        {!expanded && (
          <div className="absolute left-full rounded-md px-1 ml-2 bg-slate-400 text-dblue text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
            {text}
          </div>
        )}
      </li>
    </Link>
  );
}

function LogoutButton({ icon, text }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { expanded } = useContext(SidebarContext);

  const handleLogout = async () => {
    try {
      const response = await fetch(apiBase + "/users/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        dispatch(logout());
        dispatch(closeProfileAction());
        localStorage.clear();
        navigate("/welcome", { replace: true });
      }
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full text-left relative flex items-center p-2 cursor-pointer text-white group hover:bg-red-500 rounded-md"
    >
      <span className={`${expanded ? "mr-4" : "mr-0"}`}>{icon}</span>
      <span
        className={`text-sm overflow-hidden ${
          expanded ? "w-full" : "w-0"
        } transition-all`}
      >
        {text}
      </span>
      {!expanded && (
        <div className="absolute left-full rounded-md px-1 ml-3 bg-slate-400 text-dblue text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
          {text}
        </div>
      )}
    </button>
  );
}

export default SideBar;
export { SidebarItem, LogoutButton };
