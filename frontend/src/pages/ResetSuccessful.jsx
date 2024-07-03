import React from "react";
import { MoveLeft } from "lucide-react";

export default function ResetSuccessful() {
  return (
    <div className="w-screen h-screen text-white flex flex-col gap-4 justify-center items-center bg-dblue">
      <div className="w-auto h-auto my-10 flex justify-center">
        <img className="w-20" src="/static/images/white-logo.png" />
      </div>
      <div className="w-3/4 h-auto text-center">
        <h2 className="text-xl md:text-2xl text-red-500">
          PASSWORD RESET SUCCESSFULLY
        </h2>
        <p className="mt-3 my-2 text-xs md:text-lg md:px-12 font-extralight">
          Your Password reset was successful. You can now use your email and new
          password to login to your account.
        </p>
        <a
          className="font-thin flex justify-center items-center w-full text-xs md:text-sm mt-6 md:mt-4 "
          href="/login"
        >
          <MoveLeft size={10} className="pr-1" />
          Login
        </a>
      </div>
    </div>
  );
}
