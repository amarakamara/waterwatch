import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { setUserInfo } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import SharedLayout from "../layouts/SharedLayout";

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
      <div className="bg-red-50 border-4 border-red-600 main h-full">
        <div className="h-[26rem] border-2 border-green-300 dashboard">
          <div className="box-1  border bg-white shadow-md">box-1</div>
          <div className="box-2  border bg-white shadow-md ">box-2</div>
          <div className="box-3  border bg-white shadow-md">box-3</div>
          <div className="box-4  border bg-white shadow-md ">box-4</div>
        </div>
      </div>
    </SharedLayout>
  );
}

export default Home;
