import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { setTankData } from "../features/tank/tankSlice";
import { setUserInfo } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import SharedLayout from "../layouts/SharedLayout";
import MainContent from "../components/MainContent";
import io from "socket.io-client";

const apiBase =
  import.meta.env.VITE_ENV === "development"
    ? import.meta.env.VITE_DEV_API_BASE
    : import.meta.env.VITE_PROD_API_BASE;

const socket = io(apiBase, {
  transports: ["websocket"],
  extraHeaders: {
    "Access-Control-Allow-Origin": "*",
  },
});

function Home() {
  const uid = useSelector((state) => state.auth.userId);
  const userInformation = useSelector((state) => state.user.userinfo);
  const tankInformation = useSelector((state) => state.tank.tankinfo);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(apiBase + "/users/getUser/" + uid, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.log("Error fetching data");
        }
        const userData = await response.json();
        dispatch(setUserInfo(userData));
      } catch (error) {
        console.error(error);
      }
    };
    if (!userInformation) {
      fetchUser();
    }
  }, [userInformation]);

  useEffect(() => {
    if (socket) {
      socket.on("tankData", (responseData) => {
        const { waterLevel, temp, turbidity, pumpState, leakage } =
          responseData;
        dispatch(
          setTankData({ waterLevel, temp, turbidity, pumpState, leakage })
        );
      });

      return () => {
        if (socket.readyState === 1) {
          socket.disconnect();
        }
      };
    }
  }, [socket]);

  return (
    <SharedLayout>
      <MainContent />
    </SharedLayout>
  );
}

export default Home;
