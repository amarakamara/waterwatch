import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { HandCoins, Check } from "lucide-react";

export default function SavingTips() {
  const waterUsageData = useSelector((state) => state.usage.usageData);
  const [tip, setTip] = useState({});
  const [totalWaterUsed, setTotalWaterUsed] = useState(0);

  useEffect(() => {
    if (waterUsageData.length > 0) {
      const total = waterUsageData.reduce(
        (sum, usage) => sum + usage.totalLiters,
        0
      );
      setTotalWaterUsed(total);
    }
  }, [waterUsageData]);

  useEffect(() => {
    if (totalWaterUsed <= 50) {
      setTip({
        title: "Great job! Keep up the good work🥂",
        subtitle: "Here are some tips to save even more:",
        points: [
          "Consider using water-efficient fixtures.",
          "Continue monitoring your water usage for consistency.",
          "Share your water-saving habits with others.",
        ],
      });
    } else if (totalWaterUsed <= 100) {
      setTip({
        title: "Good effort! 🎉",
        subtitle: "Try these tips to lower your usage further:",
        points: [
          "Reduce shower time.",
          "Fix any leaks.",
          "Use a broom instead of a hose to clean driveways and sidewalks.",
        ],
      });
    } else if (totalWaterUsed <= 150) {
      setTip({
        title: "You're using quite a bit of water 😥",
        subtitle: "Here are some tips for you to save more:",
        points: [
          "Install water-saving showerheads and faucet aerators.",
          "Use a bucket to collect water while waiting for the shower to warm up, and use it to water plants.",
          "Turn off the tap while brushing your teeth or shaving.",
        ],
      });
    } else {
      setTip({
        title: "High water usage detected!⚡",
        subtitle: "Try these tips to reduce it:",
        points: [
          "Water your garden in the early morning or late evening to minimize evaporation.",
          "Install a rainwater harvesting system to collect and use rainwater for non-drinking purposes.",
          "Limit the use of sprinklers and consider drip irrigation for your garden.",
        ],
      });
    }
  }, [totalWaterUsed]);

  return (
    <div className="w-full h-full savingtips text-dblue flex flex-col justify-center items-center">
      <h2 className="text-red-500 font-bold text-base md:font-semibold text-blue-500 whitespace-nowrap flex justify-center gap-3 text-center">
        SAVINGS TIPS <HandCoins />
      </h2>
      <h2 className="text-lg mt-3 text-red-500">
        You used {totalWaterUsed} liters in the last 24 hours
      </h2>
      <div className="w-full h-full bg-white">
        <div className=" w-full h-auto flex flex-col justify-center items-center">
          <h3 className="mt-3 text-xl text-center">{tip.title}</h3>
          <p className="mt-3 text-base text-center">{tip.subtitle}</p>
          <ul className="text-left w-full h-40 scrollbar-hidden overflow-scroll mt-3 text-base px-8 lg:px-12 md:px-10">
            {tip.points &&
              tip.points.map((point, index) => (
                <li className="my-2 flex" key={index}>
                  <Check className="text-green-600" />
                  {point}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
