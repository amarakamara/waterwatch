import React from "react";

function InputField(props) {
  return (
    <input
      className="w-full h-30 mb-4 bg-transparent inputField text-xs"
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeholder}
      type={props.type}
      style={{
        border: "none",
        borderBottom: "1px solid white",
      }}
      required
    />
  );
}

export default InputField;
