import React from "react";

function InputField() {
  return (
    <input
      className="w-full h-30 mb-4"
      name={props.name}
      value={props.value}
      placeholder={props.placeholder}
      style={{
        border: "none",
        borderBottom: "1px solid #ffff",
      }}
    />
  );
}

export default InputField;
