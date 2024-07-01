import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Item from "./Item";
import PumpControl from "./PumpControl";
import TankLevel from "./TankLevel";
import UsageChart from "./UsageChart";
import SavingTips from "./SavingTips";
import { Droplet, Droplets, Thermometer, MilkOff } from "lucide-react";

export default function MainContent() {
  const tankData = useSelector((state) => state.tank.tankinfo);
  const [leakageStatus, setLeakageStatus] = useState("");
  const [literUsed, setLiterUsed] = useState(0);

  useEffect(() => {
    tankData.leakage
      ? setLeakageStatus("Leakage Detected")
      : setLeakageStatus("No Leakage");

    setLiterUsed(25 - tankData.waterLevel);
  }, [tankData]);
  return (
    <div className="bg-red-50 main h-full relative">
      <div className="w-full bg-white shadow-md top-0 sticky z-50 flex overflow-hidden ">
        <Item
          title="Liters Used"
          content={literUsed}
          icon={<Droplets size="35" />}
        />

        <Item
          title="Leakage"
          content={leakageStatus}
          icon={<MilkOff size="35" />}
        />
        <Item
          title="Temperature"
          content={`${tankData.temp} C`}
          icon={<Thermometer size="35" />}
        />
        <Item
          title="Turbidity"
          content={`${tankData.turbidity} NTC`}
          icon={<Droplet size="35" />}
        />
      </div>
      <div className="border-2 dashboard overflow-y-scroll">
        <PumpControl />
        <TankLevel />
        <UsageChart />
        <SavingTips />
      </div>
    </div>
  );
}
