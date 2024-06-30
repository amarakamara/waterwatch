import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import Widgets from "fusioncharts/fusioncharts.widgets";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import fetchUsageData from "../apis/fetchUsageData";
import { addUsage } from "../features/usage/usageSlice";

ReactFC.fcRoot(FusionCharts, charts, Widgets, FusionTheme);

export default function UsageChart() {
  const isMobile = window.innerWidth <= 768;
  const dispatch = useDispatch();
  const waterUsageData = useSelector((state) => state.usage.usageData);
  const token = useSelector((state) => state.auth.token);

  const [intervalData, setIntervalData] = useState([]);

  useEffect(() => {
    fetchUsageData(token, dispatch, addUsage);
  }, []);

  //fetch the water usage data
  useEffect(() => {
    fetchUsageData(token, dispatch, addUsage);
    const intervalId = setInterval(fetchUsageData, 24 * 60 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  //effect to divide the data into six intervals
  useEffect(() => {
    if (waterUsageData.length > 0) {
      const intervals = [
        { name: "00:00 - 06:00", totalUsage: 0 },
        { name: "06:00 - 12:00", totalUsage: 0 },
        { name: "12:00 - 15:00", totalUsage: 0 },
        { name: "15:00 - 18:00", totalUsage: 0 },
        { name: "18:00 - 21:00", totalUsage: 0 },
        { name: "21:00 - 00:00", totalUsage: 0 },
      ];
      const processedData = processWaterUsage(waterUsageData, intervals);
      setIntervalData(processedData);
    }
  }, [waterUsageData]); // Update intervalData when waterUsageData changes

  const processWaterUsage = (data, intervals) => {
    data.forEach((usageEntry) => {
      const hour = usageEntry._id;
      let foundInterval = false;

      if (hour >= 0 && hour < 6) {
        intervals[0].totalUsage += usageEntry.totalLiters;
      } else if (hour >= 6 && hour < 12) {
        intervals[1].totalUsage += usageEntry.totalLiters;
      } else if (hour >= 12 && hour < 15) {
        intervals[2].totalUsage += usageEntry.totalLiters;
      } else if (hour >= 15 && hour < 18) {
        intervals[3].totalUsage += usageEntry.totalLiters;
      } else if (hour >= 18 && hour < 21) {
        intervals[4].totalUsage += usageEntry.totalLiters;
      } else if (hour >= 21 && hour < 24) {
        intervals[5].totalUsage += usageEntry.totalLiters;
      } else {
        console.warn("Usage entry outside defined intervals:", usageEntry);
      }
    });

    return intervals;
  };

  // Prepare data for FusionCharts
  const chartData = intervalData.map((interval) => ({
    label: interval.name,
    value: interval.totalUsage,
  }));

  const dataSource = {
    chart: {
      caption: "Water Usage by Interval (Last 24 Hours)",
      xaxisname: "Interval",
      yaxisname: "Total Usage (Liters)",
      theme: "gammel",
    },
    data: chartData,
  };

  return (
    <div className="box-3 border bg-white shadow-md rounded-md">
      <div className="w-full h-auto">
        <ReactFC
          type="column2d"
          width="100%"
          height={isMobile ? "50%" : "70%"}
          dataFormat="JSON"
          dataSource={dataSource}
        />
      </div>
    </div>
  );
}
