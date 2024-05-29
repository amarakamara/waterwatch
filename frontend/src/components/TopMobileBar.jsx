import React from "react";

function TopMobileBar() {
  return (
    <div
      className="bg-blue w-full h-30 sticky top-0 py-2 px-4 flex justify-center"
      style={{
        border: "none",
        borderBottom: "1px solid white",
      }}
    >
      <img className="w-20" src="/src/assets/White-Logo.png" alt="logo" />
    </div>
  );
}

export default TopMobileBar;
