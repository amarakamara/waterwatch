import React from "react";
import { X } from "lucide-react";
import deleteHistory from "apis/deleteHistory";

export default function ShowHistory(props) {
  const handleDelete = () => {
    deleteHistory(props.id);
  };
  return (
    <div className="w-full bg-gray-300 text-dblue rounded-sm p-2 mt-1">
      <div className="flex justify-between">
        <h2 className="text-base font-semibold">Your pump was opened</h2>
        <button onClick="handleDelete">
          <X />
        </button>
      </div>
      <p className="text-sm mt-1">
        You used {props.literUsed} liters of water.
      </p>
      <p className="text-[0.6rem] mt-1">{props.timestamp}</p>
    </div>
  );
}
