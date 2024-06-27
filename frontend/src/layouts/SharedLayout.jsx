import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate, useLocation } from "react-router-dom";

import SideBar, { SidebarItem, LogoutButton } from "../components/SideBar";
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
  const historyData = useSelector((state) => state.history.historyData);
  const notificationData = useSelector(
    (state) => state.notification.notificationData
  );

  const [showHistoryAlert, setShowHistoryAlert] = useState(false);
  const [showNotificationAlert, setShowNotificationAlert] = useState(false);
  const [prevHistoryDataLength, setPrevHistoryDataLength] = useState(
    historyData.length
  );
  const [prevNotificationDataLength, setPrevNotificationDataLength] = useState(
    notificationData.length
  );

  useEffect(() => {
    if (historyData.length > prevHistoryDataLength) {
      setShowHistoryAlert(true);
      setPrevHistoryDataLength(historyData.length);
    }
  }, [historyData, prevHistoryDataLength]);

  useEffect(() => {
    if (notificationData.length > prevNotificationDataLength) {
      setShowNotificationAlert(true);
      setPrevNotificationDataLength(notificationData.length);
    }
  }, [notificationData, prevNotificationDataLength]);

  const [activePage, setActivePage] = useState("");

  useEffect(() => {
    const path = location.pathname.replace("/", "");
    setActivePage(path);
  }, [location]);

  return (
    <div className="container relative overflow-y-hidden">
      <TopBar />
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
          alert={showNotificationAlert}
          active={activePage === "notification"}
          onClick={() => {
            setShowNotificationAlert(false);
            navigate("/notification");
          }}
        />
        <SidebarItem
          icon={<History size={20} />}
          text="History"
          alert={showHistoryAlert}
          active={activePage === "history"}
          onClick={() => {
            setShowHistoryAlert(false);
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
          alert={showHistoryAlert}
          active={activePage === "history"}
          onClick={() => {
            setShowHistoryAlert(false);
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
          alert={showNotificationAlert}
          active={activePage === "notification"}
          onClick={() => {
            setShowNotificationAlert(false);
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
