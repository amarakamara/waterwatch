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
import BottomBar, { BottombarItem } from "../components/BottomBar";
import TopBar from "../components/TopBar";
import {
  LayoutDashboard,
  Bell,
  History,
  AreaChart,
  Settings,
  LogOut,
} from "lucide-react";

const SharedLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { notificationAlert, historyAlert } = useSelector(
    (state) => state.alert
  );

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
      <div className="bg-white main">{children}</div>
      <BottomBar>
        <BottombarItem
          text="Prediction"
          icon={<AreaChart size={30} />}
          active={activePage === "prediction"}
          onClick={() => navigate("/prediction")}
        />
        <BottombarItem
          text="History"
          icon={<History size={30} />}
          alert={historyAlert}
          active={activePage === "history"}
          onClick={() => {
            setHistoryAlert(false);
            navigate("/history");
          }}
        />
        <BottombarItem
          text="Dashboard"
          icon={<LayoutDashboard size={30} />}
          active={activePage === "dashboard"}
          onClick={() => navigate("/dashboard")}
        />
        <BottombarItem
          text="Notification"
          icon={<Bell size={30} />}
          alert={notificationAlert}
          active={activePage === "notification"}
          onClick={() => {
            setNotificationAlert(false);
            navigate("/notification");
          }}
        />
        <BottombarItem
          text="Setting"
          icon={<Settings size={30} />}
          active={activePage === "setting"}
          onClick={() => navigate("/setting")}
        />
      </BottomBar>
    </div>
  );
};

export default SharedLayout;
