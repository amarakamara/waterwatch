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

export default function Login() {
  const dispatch = useDispatch();

  const [loginInfo, setLoginInfo] = useState({
    username: "",
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

    setLoginInfo((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(apiBase + "/users/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginInfo.username,
          password: loginInfo.password,
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
        uid: data.userId,
      };
      dispatch(login(payload));
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Error logging in:", error.message);
      setMessage(error.message);
      dispatch(logout());
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
        backgroundImage: "url('/src/assets/pump.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-gradient-to-t text-white from-dblue via-dblue via-25% to-transparent w-full h-full flex flex-col">
        <div className="pt-1 w-full h-auto flex justify-center">
          <img className="w-20" src="/src/assets/white-logo.png" />
        </div>
        <div className="w-full h-full  flex flex-col justify-center items-center">
          <form
            className="w-80 h-auto bg-dblue bg-opacity-5 border-thin p-6 rounded-md text-xl text-center flex flex-col justify-center items-center"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl">Welcome Back</h2>
            <p className="mt-3 my-2 text-xs font-extralight">
              Enter your details to login:
            </p>
            {showMessage && <p className="text-red-500 text-1xs">{message}</p>}
            <div>
              <InputField
                name="username"
                type="email"
                value={loginInfo.username}
                onChange={handleChange}
                placeholder="Email:"
              />
              <InputField
                name="password"
                type="password"
                value={loginInfo.password}
                onChange={handleChange}
                placeholder="Password:"
              />
            </div>
            <RegLogButton value="Login" />
          </form>
          <a className="font-thin text-md md:text-sm mt-4" href="/register">
            No account? Register
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
