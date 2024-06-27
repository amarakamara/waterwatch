import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { setTankData } from "../features/tank/tankSlice";
import { setUserInfo } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import SharedLayout from "../layouts/SharedLayout";
import MainContent from "../components/MainContent";
import addNotification from "../apis/addNotification";
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
  const { uid, token } = useSelector((state) => state.auth);
  const userInformation = useSelector((state) => state.user.userinfo);
  const tankData = useSelector((state) => state.tank.tankinfo);

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

  /*handle notifications
  const createNotification = (subject, message) => {
    const notification = {
      subject,
      message,
      timestamp: new Date().toISOString(),
    };
    addNotification(token, notification);
  };


  //adds a notification for high turbidity level
  useEffect(() => {
    if (tankData.turbidity !== undefined) {
      if (tankData.turbidity > 5) {
        createNotification(
          "Critical High Turbidity Alert",
          `Alert: Water turbidity level is dangerously high. Current turbidity: ${tankData.turbidity}. Immediate action required.`
        );
      } else if (tankData.turbidity > 1) {
        createNotification(
          "High Turbidity Alert",
          `Alert: Water turbidity level has exceeded the safe threshold. Current turbidity: ${tankData.turbidity}. Please check the water quality.`
        );
      }
    }
  }, [tankData.turbidity]);
*/
  /*
  //adds a notification for high temperature
  useEffect(() => {
    if (tankData.temperature !== undefined) {
      if (tankData.temperature > 35) {
        createNotification(
          "Critical High Temperature Alert",
          `Alert: Water temperature is critically high. Current temperature: ${tankData.temperature}. Immediate action required.`
        );
      } else if (tankData.temperature > 30) {
        createNotification(
          "High Temperature Alert",
          `Alert: Water temperature has risen above the safe limit. Current temperature: ${tankData.temperature}. Please check the system.`
        );
      }
    }
  }, [tankData.temperature]);
  //adds a notification for leakage
  useEffect(() => {
    if (tankData.leakage !== undefined && tankData.leakage) {
      createNotification(
        "Leakage Detected",
        "Alert: Leakage detected in the system. Immediate inspection needed to prevent water loss."
      );
    }
  }, [tankData.leakage]);
  */
  return (
    <SharedLayout>
      <MainContent />
    </SharedLayout>
  );
}

export default Home;
