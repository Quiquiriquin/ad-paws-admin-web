type PercentageBarProps = {
  percentage?: number;
  label?: string;
  color?: string;
};

const PercentageBar = ({
  percentage = 0,
  label,
  color,
}: PercentageBarProps) => {
  return (
    <>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`${color ?? "bg-[#4B9460]"} h-2 rounded-full transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      {label && (
        <p className="text-xs text-gray-500 mt-1">
          {percentage}% {label}
        </p>
      )}
    </>
  );
};

export default PercentageBar;
