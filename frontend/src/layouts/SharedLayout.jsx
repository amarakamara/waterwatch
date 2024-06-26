import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate, useLocation } from "react-router-dom";

import SideBar, { SidebarItem, LogoutButton } from "../components/SideBar";
import BottomBar, { BottombarItem } from "../components/BottomBar";
import TopBar from "../components/TopBar";
import Profile from "../components/Profile";
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

  const [showHistoryAlert, setShowHistoryAlert] = useState(false);

  let prevHistoryDataLength = historyData.length;

  useEffect(() => {
    if (historyData.length > prevHistoryDataLength) {
      setShowHistoryAlert(true);
      prevHistoryDataLength = historyData.length;
    }
  }, [historyData]);

  const [activePage, setActivePage] = useState("");

  useEffect(() => {
    const path = location.pathname.replace("/", "");
    setActivePage(path);
    setShowHistoryAlert(false);
  }, [location]);

  return (
    <div className="container relative overflow-y-hidden">
      <TopBar />
      <Profile icon={<LogOut size={20} />} />
      <SideBar>
        <SidebarItem
          icon={<LayoutDashboard size={20} />}
          text="Dashboard"
          active={activePage === "dashboard"}
          onClick={() => setActivePage("dashboard")}
        />
        <SidebarItem
          icon={<Bell size={20} />}
          text="Notification"
          alert={activePage === "notification" ? false : true}
          active={activePage === "notification"}
          onClick={() => setActivePage("notification")}
        />
        <SidebarItem
          icon={<History size={20} />}
          text="History"
          alert={showHistoryAlert ? true : false}
          active={activePage === "history"}
          onClick={() => setActivePage("history")}
        />
        <SidebarItem
          icon={<AreaChart size={20} />}
          text="Prediction"
          active={activePage === "prediction"}
          onClick={() => setActivePage("prediction")}
        />
        <hr className="mt-1 mb-10" />
        <SidebarItem
          icon={<Settings size={20} />}
          text="Setting"
          active={activePage === "setting"}
          onClick={() => setActivePage("setting")}
        />
        <LogoutButton icon={<LogOut size={20} />} text="Logout" />
      </SideBar>
      <div className="bg-white main">{children}</div>
      <BottomBar>
        <BottombarItem
          text="Prediction"
          icon={<AreaChart size={30} />}
          active={activePage === "prediction"}
          onClick={() => setActivePage("prediction")}
        />
        <BottombarItem
          text="History"
          icon={<History size={30} />}
          alert={showHistoryAlert ? true : false}
          active={activePage === "history"}
          onClick={() => setActivePage("history")}
        />
        <BottombarItem
          text="Dashboard"
          icon={<LayoutDashboard size={30} />}
          active={activePage === "dashboard"}
          onClick={() => setActivePage("dashboard")}
        />
        <BottombarItem
          text="Notification"
          icon={<Bell size={30} />}
          alert={activePage === "notification" ? false : true}
          active={activePage === "notification"}
          onClick={() => setActivePage("notification")}
        />
        <BottombarItem
          text="Setting"
          icon={<Settings size={30} />}
          active={activePage === "setting"}
          onClick={() => setActivePage("setting")}
        />
      </BottomBar>
    </div>
  );
};

export default SharedLayout;
