import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { setUserInfo } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import SharedLayout from "../layouts/SharedLayout";
import Item from "../components/Item";
import PumpControl from "../components/PumpControl";
import { Droplet, Droplets, Thermometer, MilkOff } from "lucide-react";

const apiBase =
  import.meta.env.VITE_ENV === "development"
    ? import.meta.env.VITE_DEV_API_BASE
    : import.meta.env.VITE_PROD_API_BASE;

function Home() {
  const uid = useSelector((state) => state.auth.userId);
  const userInformation = useSelector((state) => state.user.userinfo);
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
        console.log(userData);
      } catch (error) {
        console.error(error);
      }
    };
    if (!userInformation) {
      fetchUser();
    }
  }, [userInformation]);

  return (
    <SharedLayout>
      <div className="bg-red-50 main h-full relative">
        <div className="w-full bg-white shadow-md top-0 sticky flex overflow-hidden ">
          <Item
            title="Liters Used"
            content="30 ltrs"
            icon={<Droplets size="35" />}
          />

          <Item
            title="Leakage"
            content="No leakage"
            icon={<MilkOff size="35" />}
          />
          <Item
            title="Temperature"
            content="30 C"
            icon={<Thermometer size="35" />}
          />
          <Item title="Turbidity" content="20%" icon={<Droplet size="35" />} />
        </div>
        <div className="border-2 dashboard overflow-y-scroll">
          <PumpControl />
          <div className="box-2 p-4 border bg-white rounded-md">
            <div>ELEMENT</div>
          </div>
          <div className="box-3  border bg-white shadow-md rounded-md">
            <div>ELEMENT</div>
            <div>ELEMENT</div>
            <div>ELEMENT</div>
            <div>ELEMENT</div>
            <div>ELEMENT</div>
          </div>
          <div className="box-4  border bg-white shadow-md rounded-md ">
            <div>ELEMENT</div>
            <div>ELEMENT</div>
            <div>ELEMENT</div>
            <div>ELEMENT</div>
            <div>ELEMENT</div>
          </div>
        </div>
      </div>
    </SharedLayout>
  );
}

export default Home;
