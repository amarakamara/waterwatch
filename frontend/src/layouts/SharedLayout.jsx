import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate, useLocation } from "react-router-dom";
import {
  setNotificationAlert,
  setHistoryAlert,
} from "../features/alert/alertSlice";
import SideBar, { SidebarItem, LogoutButton } from "../components/SideBar";
import Profile from "../components/Profile";
import Item from "../components/Item";
import MobileMenu, { MobileMenuItem } from "../components/MobileMenu";
import TopBar from "../components/TopBar";
import {
  LayoutDashboard,
  Bell,
  History,
  AreaChart,
  Settings,
  LogOut,
  Droplet,
  Droplets,
  Thermometer,
  MilkOff,
} from "lucide-react";

const SharedLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { notificationAlert, historyAlert } = useSelector(
    (state) => state.alert
  );
  const tankData = useSelector((state) => state.tank.tankinfo);
  const [leakageStatus, setLeakageStatus] = useState("");
  const [literUsed, setLiterUsed] = useState(0);

  useEffect(() => {
    tankData.leakage
      ? setLeakageStatus("Leakage Detected")
      : setLeakageStatus("No Leakage");

    setLiterUsed(25 - tankData.waterLevel);
  }, [tankData]);

  const [activePage, setActivePage] = useState("");

  useEffect(() => {
    const path = location.pathname.replace("/", "");
    setActivePage(path);
  }, [location]);

  // New useEffect hook for resetting alerts on route change
  useEffect(() => {
    const { pathname } = location;
    if (pathname === "/history") {
      dispatch(setHistoryAlert(false));
    } else if (pathname === "/notification") {
      dispatch(setNotificationAlert(false));
    }
  }, [location]);

  return (
    <div className="container relative overflow-y-hidden">
      <TopBar />
      <div className="md:shadow-md lg:shadow-md bg-white w-full flex p-1 md:p-0 lg:p-0 border-b-0.1">
        <Item
          title="Liters Used"
          content={literUsed}
          icon={<Droplets size="35" />}
        />
        <Item
          title="Leakage"
          content={leakageStatus}
          icon={<MilkOff size="35" />}
        />
        <Item
          title="Temperature"
          content={`${tankData.temp} C`}
          icon={<Thermometer size="35" />}
        />
        <Item
          title="Turbidity"
          content={`${tankData.turbidity} NTC`}
          icon={<Droplet size="35" />}
        />
      </div>
      <MobileMenu>
        <MobileMenuItem
          text="Prediction"
          icon={<AreaChart size={22} />}
          active={activePage === "prediction"}
          onClick={() => navigate("/prediction")}
        />
        <MobileMenuItem
          text="History"
          icon={<History size={22} />}
          alert={historyAlert}
          active={activePage === "history"}
          onClick={() => {
            setHistoryAlert(false);
            navigate("/history");
          }}
        />
        <MobileMenuItem
          text="Dashboard"
          icon={<LayoutDashboard size={22} />}
          active={activePage === "dashboard"}
          onClick={() => navigate("/dashboard")}
        />
        <MobileMenuItem
          text="Notification"
          icon={<Bell size={22} />}
          alert={notificationAlert}
          active={activePage === "notification"}
          onClick={() => {
            setNotificationAlert(false);
            navigate("/notification");
          }}
        />
        <MobileMenuItem
          text="Setting"
          icon={<Settings size={22} />}
          active={activePage === "setting"}
          onClick={() => navigate("/setting")}
        />
      </MobileMenu>
      <Profile />
      <SideBar>
        <SidebarItem
          icon={<LayoutDashboard size={20} />}
          text="Dashboard"
          active={activePage === "dashboard"}
          onClick={() => navigate("/dashboard")}
        />
        <SidebarItem
          icon={<Bell size={20} />}
          text="Notification"
          alert={notificationAlert}
          active={activePage === "notification"}
          onClick={() => {
            setNotificationAlert(false);
            navigate("/notification");
          }}
        />
        <SidebarItem
          icon={<History size={20} />}
          text="History"
          alert={historyAlert}
          active={activePage === "history"}
          onClick={() => {
            setHistoryAlert(false);
            navigate("/history");
          }}
        />
        <SidebarItem
          icon={<AreaChart size={20} />}
          text="Prediction"
          active={activePage === "prediction"}
          onClick={() => navigate("/prediction")}
        />
        <hr className="mt-1 mb-10" />
        <SidebarItem
          icon={<Settings size={20} />}
          text="Setting"
          active={activePage === "setting"}
          onClick={() => navigate("/setting")}
        />
        <LogoutButton
          icon={<LogOut size={20} />}
          text="Logout"
          onClick={() => dispatch(logout())}
        />
      </SideBar>
      <div className="main bg-red-50">{children}</div>
    </div>
  );
};

export default SharedLayout;
