import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PumpControl from "./PumpControl";
import TankLevel from "./TankLevel";
import UsageChart from "./UsageChart";
import SavingTips from "./SavingTips";


export default function MainContent() {
  return (
    <div className="bg-red-50 main h-full relative">
      <div className="border-2 dashboard overflow-y-scroll">
        <PumpControl />
        <TankLevel />
        <UsageChart />
        <SavingTips />
      </div>
    </div>
  );
}
