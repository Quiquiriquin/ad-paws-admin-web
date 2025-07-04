import React from "react";

const DisplayInformation = ({
  label,
  icon,
  text,
}: {
  label: string;
  icon?: React.ReactNode;
  text: string;
}) => {
  return (
    <div>
      <label className="block text-neutral-700 text-xs">
        {icon && <span className="mr-2">{icon}</span>}
        {label}{" "}
      </label>
      <label className="block text-neutral-800 text-base font-bold">
        {text}
      </label>
    </div>
  );
};

export default DisplayInformation;
