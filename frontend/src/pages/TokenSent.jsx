import React from "react";
import { MoveLeft } from "lucide-react";

export default function TokenSent() {
  return (
    <div className="w-screen h-screen text-white flex flex-col gap-4 justify-center items-center bg-dblue">
      <div className="w-auto h-auto my-10 flex justify-center">
        <img className="w-20" src="/src/assets/white-logo.png" />
      </div>
      <div className="w-3/4 h-auto text-center">
        <h2 className="text-xl md:text-2xl text-red-500">
          RESET PASSWORD LINK SENT
        </h2>
        <p className="mt-3 my-2 text-xs md:text-lg md:px-12 font-extralight">
          An email with a link to reset your password has been sent to your
          registered email. Check your email and open the link to reset your
          password.
        </p>
        <a
          className="font-thin flex justify-center items-center w-full text-xs md:text-sm mt-6 md:mt-4 "
          href="/"
        >
          <MoveLeft size={10} className="pr-1" />
          Go to home
        </a>
      </div>
    </div>
  );
}
