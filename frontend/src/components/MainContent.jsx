import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PumpControl from "./PumpControl";
import TankLevel from "./TankLevel";
import UsageChart from "./UsageChart";
import SavingTips from "./SavingTips";

export default function MainContent() {
  return (
    <div className="flex flex-col md:flex-row lg:flex-row flex-wrap px-2 py-4">
      <div className="w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(50%-0.5rem)] m-1 px-2 py-4 border bg-white rounded-md">
        <PumpControl />
      </div>
      <div className="w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(50%-0.5rem)] m-1 px-2 py-4 border bg-white rounded-md">
        <TankLevel />
      </div>
      <div className="w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(50%-0.5rem)] m-1 px-2 py-4 border bg-white rounded-md">
        <UsageChart />
      </div>
      <div className="w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(50%-0.5rem)] m-1 px-2 py-4 border bg-white rounded-md">
        <SavingTips />
      </div>
    </div>
  );
}
