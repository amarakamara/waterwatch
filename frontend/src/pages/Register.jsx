import React, { useState, useEffect } from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout } from "../features/auth/authSlice";
import InputField from "../components/InputField";
import RegLogButton from "../components/RegLogButton";
import { MoveLeft } from "lucide-react";

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

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        localStorage.setItem("jwtToken", data.token);
        const payload = {
          jwtToken: data.token,
          authenticated: true,
        };
        dispatch(login(payload));
        navigate("/dashboard", { replace: true });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error registering:", error.message);
      setMessage(error.message);
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
        backgroundImage:
          "url('https://images.pexels.com/photos/7527861/pexels-photo-7527861.jpeg?auto=compress&cs=tinysrgb&w=600')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-gradient-to-t text-white from-dblue via-dblue via-25% to-transparent w-screen h-screen flex flex-col items-center">
        <div className="pt-1 w-full h-auto flex justify-center">
          <img className="w-20" src="/src/assets/white-logo.png" />
        </div>
        <div className="w-full h-full  flex flex-col justify-center items-center">
          <form
            className="w-80 h-auto bg-dblue bg-opacity-5 border-thin p-6 rounded-md text-xl text-center flex flex-col justify-center items-center"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl">Create Account</h2>
            <p className="my-4 text-xs font-extralight">
              Create account to start monitoring your tank
            </p>
            {showMessage && <p className="text-red-500 text-1xs">{message}</p>}
            <div>
              <InputField
                name="name"
                type="text"
                value={registerInfo.name}
                onChange={handleChange}
                placeholder="Name:"
              />
              <InputField
                name="email"
                type="email"
                value={registerInfo.email}
                onChange={handleChange}
                placeholder="Email:"
              />
              <InputField
                name="password"
                type="password"
                value={registerInfo.password}
                onChange={handleChange}
                placeholder="Password:"
              />
            </div>
            <RegLogButton value="Register" />
          </form>
          <a
            className="font-thin text-md md:text-sm mt-4 md:mt-2"
            href="/login"
          >
            Have an account? Login
          </a>
          <a
            className="font-thin flex items-center text-xs md:text-1xs mt-4 md:mt-2"
            href="/"
          >
            <MoveLeft size={10} className="pr-1" />
            Go to home
          </a>
        </div>
      </div>
    </div>
  );
}
