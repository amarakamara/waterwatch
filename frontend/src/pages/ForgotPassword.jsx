import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";
import { MoveLeft } from "lucide-react";
import whiteLogo from "/public/images/White-Logo.png";

const apiBase =
  import.meta.env.VITE_ENV === "development"
    ? import.meta.env.VITE_DEV_API_BASE
    : import.meta.env.VITE_PROD_API_BASE;

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async () => {
    event.preventDefault();
    try {
      console.log("The email", email);
      const response = await fetch(apiBase + "/password/forgotpassword", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      navigate(`/tokensent`, {
        replace: true,
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div
      className="w-full h-screen overflow-hidden bg-dblue"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1526131424827-a96615888a26?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full h-full flex flex-col justify-center items-center bg-dblue bg-opacity-40">
        <div className="w-auto h-auto my-10 flex justify-center">
          <img className="w-20" src={whiteLogo} />
        </div>
        <form
          className="w-4/5 h-auto bg-dblue bg-opacity-10  border-thin px-10 py-6 rounded-md text-xl text-center text-white flex flex-col justify-center items-center"
          onSubmit={handleSubmit}
        >
          <h2 className="text-xl lg:text-2xl">Forgot Your Password?</h2>
          <p className="mt-3 mb-4 text-xs font-extralight">
            Enter your email address associated with your account to reset your
            password.
          </p>
          <div className="w-full mb-2">
            <InputField
              name="email"
              type="email"
              value={email}
              onChange={handleChange}
              placeholder="Email:"
            />
          </div>
          <SubmitButton value="Submit" />
        </form>
        <a
          className="font-thin flex items-center text-white text-xs md:text-xs mt-4"
          href="/"
        >
          <MoveLeft size={10} className="pr-1" />
          Go to home
        </a>
      </div>
    </div>
  );
}
