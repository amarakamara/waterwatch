import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice"; // Import logout action
import { useNavigate } from "react-router-dom"; // Import useNavigate
import TopMobileBar from "../components/TopMobileBar";
import BottomMobileBar from "../components/BottomMobileBar";
import MoreInfo from "../components/MoreInfo";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate hook

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/users/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.status === 200) {
        localStorage.removeItem("jwtToken");
        dispatch(logout());
        navigate("/"); // Use navigate properly
      } else {
        console.log("logout failed");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="">
      <h1>HOME</h1>
    </div>
  );
}

export default Home;
