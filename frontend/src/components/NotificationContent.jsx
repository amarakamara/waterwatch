import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ShowNotification from "./ShowNotification";
import SideInfo from "./SideInfo";
import fetchNotification from "../apis/fetchNotification";
import { addNotification } from "../features/notification/notificationSlice";

export default function NotificationContent() {
  const dispatch = useDispatch();
  const notificationData = useSelector(
    (state) => state.notification.notificationData
  );
  const token = useSelector((state) => state.auth.token);

  // Run once on mount
  useEffect(() => {
    fetchNotification(token, dispatch, addNotification);
  }, []);

  // Fetch notification data when notificationData changes
  useEffect(() => {
    if (notificationData.length === 0) {
      fetchNotification(token, dispatch, addNotification);
    }
  }, [notificationData]);

  function filterByDate(data) {
    const today = new Date();

    const todayData = [];
    const yesterdayData = [];
    const pastData = [];

    for (const entry of data) {
      const notificationDate = new Date(entry.timestamp);

      const yearDiff = today.getFullYear() - notificationDate.getFullYear();
      const isSameYear = yearDiff === 0;

      if (isSameYear) {
        const dayDiff = today.getDate() - notificationDate.getDate();

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

  const { todayData, yesterdayData, pastData } = filterByDate(notificationData);

  return (
    <div className="bg-white main h-full">
      <div className="w-full h-full flex overflow-hidden">
        <div className="w-full lg:w-3/4 h-full border">
          <div className="w-full h-10 bg-red-500 flex items-center p-5 sticky top-0 border-b-2">
            <h1 className="text-white font-semibold">Your Notifications</h1>
          </div>
          <div className="w-full h-full overflow-y-scroll">
            <div className="w-full h-auto mt-1 p-5">
              <h2 className="text-gray-500 text-xs">Today</h2>
              <hr className="my-2" />
              {todayData.length > 0 &&
                todayData.map((entry) => (
                  <ShowNotification
                    key={entry._id}
                    id={entry._id}
                    subject={entry.subject}
                    message={entry.message}
                    timestamp={new Date(entry.timestamp).toLocaleString()}
                  />
                ))}
            </div>
            <div className="w-full h-auto mt-1 p-5">
              <h2 className="text-gray-500 text-xs">Yesterday</h2>
              <hr className="my-2" />
              {yesterdayData.length > 0 &&
                yesterdayData.map((entry) => (
                  <ShowNotification
                    key={entry._id}
                    id={entry._id}
                    subject={entry.subject}
                    message={entry.message}
                    timestamp={new Date(entry.timestamp).toLocaleString()}
                  />
                ))}
            </div>
            <div className="w-full h-auto mt-1 p-5">
              <h2 className="text-gray-500 text-xs">Past days</h2>
              <hr className="my-2" />
              {pastData.length > 0 && 
                pastData.map((entry) => (
                  <ShowNotification
                    key={entry._id}
                    id={entry._id}
                    subject={entry.subject}
                    message={entry.message}
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
