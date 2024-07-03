import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";
import { MoveLeft } from "lucide-react";

const apiBase =
  import.meta.env.VITE_ENV === "development"
    ? import.meta.env.VITE_DEV_API_BASE
    : import.meta.env.VITE_PROD_API_BASE;

export default function NewPassword() {
  const navigate = useNavigate();
  const { token } = useParams();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const data = {
      newPassword: formData.password,
    };

    if (token) {
      try {
        const response = await fetch(
          apiBase + `/password/resetpassword/${token}`,
          {
            method: "PUT",
            credentials: "include",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        if (!response.ok) {
          alert("Error resetting password");
          throw new Error("Something went wrong");
        }
        navigate(`/resetsuccessful`, {
          replace: true,
        });
      } catch (error) {
        throw new Error(error);
      }
    } else {
      alert("Token empty");
    }
  };

  return (
    <div
      className="w-full h-screen  bg-dblue"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1526131424827-a96615888a26?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full h-full flex flex-col justify-center items-center bg-dblue bg-opacity-40">
        <div className="w-auto h-auto my-10 flex justify-center">
          <img className="w-20" src="/static/images/white-logo.png" />
        </div>
        <form
          className="w-96 h-auto bg-dblue  border-thin px-10 py-6 rounded-md text-xl text-center text-white flex flex-col justify-center items-center"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl mb-4">Create a new password</h2>
          <InputField
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password:"
          />
          <div className="w-full">
            <InputField
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="confirm your password:"
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
