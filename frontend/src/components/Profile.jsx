import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { LogOut, X } from "lucide-react";
import {
  openProfile,
  closeProfile as closeProfileAction,
} from "../features/windows/windowSlice";
import { useNavigate } from "react-router-dom";

const apiBase =
  import.meta.env.VITE_ENV === "development"
    ? import.meta.env.VITE_DEV_API_BASE
    : import.meta.env.VITE_PROD_API_BASE;

export default function Profile(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const show = useSelector((state) => state.windows.showProfile);
  const userData = useSelector((state) => state.user.userinfo);
  const [animationClass, setAnimationClass] = useState("");

  const profileRef = useRef(null);

  useEffect(() => {
    if (show) {
      setAnimationClass("animate-slideIn");
    } else {
      setAnimationClass("animate-slideOut");
    }
  }, [show]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        handleCloseProfile();
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show]);

  const handleCloseProfile = () => {
    setAnimationClass("animate-slideOut");
    setTimeout(() => dispatch(closeProfileAction()), 300);
  };

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
        dispatch(closeProfileAction());
        dispatch(logout());
        localStorage.clear();
        navigate("/welcome", { replace: true });
      }
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div
      ref={profileRef}
      className={`max-h-50 max-w-50 w-50 h-auto absolute top-[2.8rem] right-2 shadow-md bg-red-500 ${animationClass} rounded-lg z-50`}
      style={{ display: show ? "block" : "none" }}
    >
      <div className="w-full p-2 py-2 bg-white text-red-500">
        <span onClick={handleCloseProfile}>
          <X />
        </span>
        <span className="flex justify-left items-center">
          <img
            src="https://img.icons8.com/?size=100&id=23244&format=png&color=000000"
            alt="avatar"
            className="rounded-md w-10 h-10 mr-2"
          />
          <h2 className="font-semibold text-2xl leading-1 mt-1">
            {userData.name}
          </h2>
        </span>
      </div>
      <div className="w-full px-2 py-4 overflow-hidden text-white font-bold">
        <h4 className="text-xs text-gray-300">id: {userData.username}</h4>
        <h4 className="text-xs text-gray-300">tank id: john1212gjah</h4>
        <hr className="my-4" />
        <button className="flex gap-1 font-semibold" onClick={handleLogout}>
          {props.icon}Logout
        </button>
      </div>
    </div>
  );
}
