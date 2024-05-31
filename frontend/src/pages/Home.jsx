import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice"; // Import logout action
import { useNavigate } from "react-router-dom"; // Import useNavigate
import SideBar, { SidebarItem, LogoutButton } from "../components/SideBar";
import {
  LayoutDashboard,
  Bell,
  History,
  AreaChart,
  Settings,
  LogOut,
} from "lucide-react";

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
    <div className="container bg-green-500">
      <div className="bg-dblue header"></div>
      <SideBar>
        <SidebarItem
          icon={<LayoutDashboard size={20} />}
          text="Dashboard"
          active
        />
        <SidebarItem icon={<Bell size={20} />} text="Notification" alert />
        <SidebarItem icon={<History size={20} />} text="History" />
        <SidebarItem icon={<AreaChart size={20} />} text="Predictions" />
        <hr className="mt-1 mb-10" />
        <SidebarItem icon={<Settings size={20} />} text="Settings" />
        <LogoutButton icon={<LogOut size={20} />} text="Logout" />
      </SideBar>
      <div className="bg-white main"></div>
      <div className="bg-yellow-500 footer block md:hidden">3</div>
    </div>
  );
}

export default Home;
