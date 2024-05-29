import React from "react";
import NavButton from "../components/NavButton";

function Welcome() {
  return (
    <div
      className="w-screen h-screen"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/2708177/pexels-photo-2708177.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
      }}
    >
      <div className="text-white w-full h-full z-10 bg-gradient-to-t from-blue via-blue via-25% to-transparent flex flex-col m-0">
        <div className=" pt-4 w-full h-auto z-20 flex justify-center">
          <img className="w-20" src="/src/assets/White-logo.png" />
        </div>
        <div className="w-full h-full flex flex-col justify-center p-4 text-center font-kufam">
          <h2 className="text-5xl my-4 text-nowrap"> Start Monitoring</h2>
          <p className="lg:px-96 md:px-60">
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
