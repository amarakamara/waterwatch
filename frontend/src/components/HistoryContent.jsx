import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ShowHistory from "./ShowHistory";
import SideInfo from "./SideInfo";
import fetchHistory from "../apis/fetchHistory";
import { addHistory } from "../features/history/historySlice";

export default function HistoryContent() {
  const dispatch = useDispatch();
  const historyData = useSelector((state) => state.history.historyData);
  const token = useSelector((state) => state.auth.token);

  // Run once on mount
  useEffect(() => {
    fetchHistory(token, dispatch, addHistory);
  }, []);

  // Fetch history data when historyData changes
  useEffect(() => {
    if (historyData.length === 0) {
      fetchHistory(token, dispatch, addHistory);
    }
  }, [historyData]);

  function filterByDate(data) {
    const today = new Date();

    const todayData = [];
    const yesterdayData = [];
    const pastData = [];

    for (const entry of data) {
      const usageDate = new Date(entry.timestamp);

      const yearDiff = today.getFullYear() - usageDate.getFullYear();
      const isSameYear = yearDiff === 0;

      if (isSameYear) {
        const dayDiff = today.getDate() - usageDate.getDate();

        if (dayDiff === 0) {
          todayData.push(entry);
        } else if (dayDiff === 1) {
          yesterdayData.push(entry);
        } else {
          pastData.push(entry);
        }
      } else {
        pastData.push(entry);
      }
    }

    return { todayData, yesterdayData, pastData };
  }

  const { todayData, yesterdayData, pastData } = filterByDate(historyData);

  return (
    <div className="bg-white main h-full">
      <div className="w-full h-full flex overflow-hidden">
        <div className="w-full lg:w-3/4 h-full border">
          <div className="w-full h-10 bg-red-500 flex items-center px-2 sticky top-0 border-b-2">
            <h1 className="text-white font-semibold">
              History
            </h1>
          </div>
          <div className="w-full h-full overflow-y-scroll flex flex-col gap-4 px-2 py-5">
            <div className="w-full h-auto">
              <h2 className="text-gray-500 text-xs">Today</h2>
              <hr className="my-2" />
              {todayData.length > 0 &&
                todayData.map((entry) => (
                  <ShowHistory
                    key={entry._id}
                    id={entry._id}
                    literUsed={entry.literUsed}
                    timestamp={new Date(entry.timestamp).toLocaleString()}
                  />
                ))}
            </div>
            <div className="w-full h-auto">
              <h2 className="text-gray-500 text-xs">Yesterday</h2>
              <hr className="my-2" />
              {yesterdayData.length > 0 &&
                yesterdayData.map((entry) => (
                  <ShowHistory
                    key={entry._id}
                    id={entry._id}
                    literUsed={entry.literUsed}
                    timestamp={new Date(entry.timestamp).toLocaleDateString()}
                  />
                ))}
            </div>
            <div className="w-full h-auto">
              <h2 className="text-gray-500 text-xs">Past days</h2>
              <hr className="my-2" />
              {pastData.length > 0 &&
                pastData.map((entry) => (
                  <ShowHistory
                    key={entry._id}
                    id={entry._id}
                    literUsed={entry.literUsed}
                    timestamp={new Date(entry.timestamp).toLocaleString()}
                  />
                ))}
            </div>
          </div>
        </div>
        <SideInfo />
      </div>
    </div>
  );
}
