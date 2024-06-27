import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react";
import deleteNotification from "../apis/deleteNotification";
import { removeNotification } from "../features/notification/notificationSlice";

export default function ShowNotification(props) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const handleDelete = () => {
    deleteNotification(token, dispatch, removeNotification, props.id);
  };
  return (
    <div className="w-full bg-gray-300 text-dblue rounded-sm p-2 mt-1">
      <div className="flex justify-between">
        <h2 className="text-base font-semibold">{props.subject}</h2>
        <button onClick={handleDelete}>
          <X />
        </button>
      </div>
      <p className="text-sm mt-1">{props.message}</p>
      <p className="text-[0.6rem] mt-1">{props.timestamp}</p>
    </div>
  );
}
