import React from "react";
import NavButton from "../components/NavButton";
import whiteLogo from "/public/images/White-Logo.png";

function Welcome() {
  return (
    <div
      className="w-full h-screen overflow-hidden"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-photo/water-drop-blue-background_23-2147828373.jpg?w=900&t=st=1717152245~exp=1717152845~hmac=8b0549beed7e7bbcc35719a6933394439e2bf36cc5b14c04efa07d54a4831e5e')",
      }}
    >
      <div className="text-white w-full h-full z-10 via-25% to-transparent flex flex-col justify-center items-center  m-0">
        <div className="mb-10 w-full h-auto z-20 flex justify-center">
          <img className="w-20" src={whiteLogo} />
        </div>
        <div className="w-full h-auto flex flex-col justify-center px-4 text-center font-kufam">
          <h2 className="text-4xl md:text-5xl lg:text-5xl mb-4 text-nowrap"> Start Monitoring</h2>
          <p className="lg:px-80 md:px-60">
            Proceed to change the way you use water forever. Utilize our app
            that provides you with the technology to manage and monitor your
            water usage efficiently.
          </p>
          <div className="flex flex-row w-auto h-auto justify-center mt-10">
            <NavButton value="Register" navTo="/register" />
            <NavButton value="Login" navTo="/login" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
