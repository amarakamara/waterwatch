import React from "react";
import Item from "./Item";
import PumpControl from "./PumpControl";
import TankLevel from "./TankLevel";
import { Droplet, Droplets, Thermometer, MilkOff } from "lucide-react";

export default function MainContent() {
  return (
    <div className="bg-red-50 main h-full relative">
      <div className="w-full bg-white shadow-md top-0 sticky z-50 flex overflow-hidden ">
        <Item
          title="Liters Used"
          content="30 ltrs"
          icon={<Droplets size="35" />}
        />

        <Item
          title="Leakage"
          content="No leakage"
          icon={<MilkOff size="35" />}
        />
        <Item
          title="Temperature"
          content="30 C"
          icon={<Thermometer size="35" />}
        />
        <Item title="Turbidity" content="20%" icon={<Droplet size="35" />} />
      </div>
      <div className="border-2 dashboard overflow-y-scroll">
        <PumpControl />
        <TankLevel />
        <div className="box-3  border bg-white shadow-md rounded-md"></div>
        <div className="box-4  border bg-white shadow-md rounded-md "></div>
      </div>
    </div>
  );
}
