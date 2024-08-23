import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import Widgets from "fusioncharts/fusioncharts.widgets";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { Cylinder, BadgeCheck, Droplets } from "lucide-react";

ReactFC.fcRoot(FusionCharts, Charts, Widgets, FusionTheme);

const TankLevel = () => {
  const isMobile = window.innerWidth <= 768;
  const tankData = useSelector((state) => state.tank.tankinfo);
  const totalCapacity = 20;
  const [percentage, setPercentage] = useState(0);

  const [dataSource, setDataSource] = useState({
    chart: {
      lowerlimit: "0",
      upperlimit: "20",
      lowerlimitdisplay: "Empty",
      upperlimitdisplay: "Full",
      numbersuffix: " ltrs",
      cylfillcolor: "#00ffff",
      plottooltext: "Tank Capacity: <b>20 ltrs</b>",
      cylfillhoveralpha: "85",
      theme: "fusion",
    },
    value: "20",
  });

  useEffect(() => {
    if (tankData.waterLevel !== undefined) {
      setDataSource((prevDataSource) => ({
        ...prevDataSource,
        value: tankData.waterLevel,
      }));
      const waterLevelPercentage = Math.round(
        (tankData.waterLevel / totalCapacity) * 100
      );
      setPercentage(waterLevelPercentage);
    }
  }, [tankData.waterLevel]);

  return (
    <div className="w-full h-full tanklevel text-dblue">
      <div className="pl-2 flex flex-col justify-center">
        <h2 className="font-bold text-base mb-4 md:font-semibold text-red-500 whitespace-nowrap flex justify-center gap-3 text-center">
          WATER LEVEL <Cylinder />
        </h2>
        <div className="flex justify-center items-center overflow-hidden">
          <div className="w-auto flex flex-col gap-2">
            <span className="flex flex-col mb-6">
              <span className="flex items-center h-auto p-0 gap-1">
                <h2 className="text-6xl font-bold p-0">
                  {tankData.waterLevel}
                </h2>
                <p>liters</p>
              </span>
              <p className="text-xs">{percentage}% available</p>
            </span>
            <h3 className="text-sm md:text-lg font-semibold flex gap-1">
              <Droplets className="text-red-500" />
              Liters Used: {20 - tankData.waterLevel} ltrs
            </h3>
            <h3 className="text-sm md:text-lg mb-6 md:mb-0 font-semibold flex gap-1">
              <BadgeCheck className="text-red-500" />
              Status:{tankData.waterLevel > 10 ? "Normal" : "Lower"}
            </h3>
          </div>
          <div className="w-1/2 h-full">
            <ReactFC
              type="cylinder"
              width="100%"
              height={isMobile ? "30%" : "50%"}
              dataFormat="JSON"
              dataSource={dataSource}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TankLevel;
