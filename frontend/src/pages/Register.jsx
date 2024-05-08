import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout } from "../features/auth/authSlice";

const apiBase =
  import.meta.env.VITE_ENV === "development"
    ? import.meta.env.VITE_DEV_API_BASE
    : import.meta.env.VITE_PROD_API_BASE;

export default function Register() {
  const dispatch = useDispatch();

  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setRegisterInfo((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(apiBase + "/users/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: registerInfo.name,
          email: registerInfo.email,
          password: registerInfo.password,
        }),
      });

      if (!response.ok) {
        const responseMessage = await response.json();
        const errorMessage = await responseMessage.message;
        setMessage(errorMessage);
        setShowMessage(true);
        throw new Error(errorMessage);
      }
      const data = await response.json();
      const payload = {
        jwtToken: data.token,
        authenticated: data.authenticated,
      };
      dispatch(login(payload));
      localStorage.setItem("authenticated", authenticated);
      navigate("/home", { replace: true });
    } catch (error) {
      console.error("Error logging in:", error.message);
      setMessage(error.message);
      dispatch(logout);
      setShowMessage(true);
    }
  };

  const togglePasswordView = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="w-screen h-screen"
      style={{
        backgroundImage: "url('/src/assets/tap.jpg')",
        backgroundSize: "fit",
      }}
    >
      <div className="">
        <form onSubmit={handleSubmit}></form>
      </div>
    </div>
  );
}
