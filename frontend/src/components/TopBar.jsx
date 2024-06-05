import React from "react";
import { useDispatch } from "react-redux";

import { openProfile as openUserProfile } from "../features/windows/windowSlice";

export default function TopBar(props) {
  const dispatch = useDispatch();

  const showProfile = () => {
    dispatch(openUserProfile());
  };
  return (
    <div className="bg-dblue header flex justify-end items-center sticky">
      <span onClick={showProfile} className="px-6 py-44 md:hidden">
        <img
          src="https://img.icons8.com/?size=100&id=23244&format=png&color=000000"
          alt="avatar"
          className="rounded-md w-10 h-10"
        />
      </span>
    </div>
  );
}
