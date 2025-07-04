import type React from "react";

const Label = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <label className={`text-[#212121] dark:text-neutral-200 ${className}`}>
      {children}
    </label>
  );
};

export default Label;
