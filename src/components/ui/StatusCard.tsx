import React from "react";

interface ServiceStatusCardProps {
  icon: React.ReactNode;
  iconBg?: string;
  cardBg?: string;
  title: string;
  description: string;
  value: React.ReactNode;
  valueBg?: string;
  valueLabel?: string;
}

const ServiceStatusCard: React.FC<ServiceStatusCardProps> = ({
  icon,
  iconBg = "bg-green-100",
  cardBg = "bg-green-50",
  title,
  description,
  value,
  valueBg = "bg-[#4B9460] text-neutral-200",
  valueLabel,
}) => {
  return (
    <div
      className={`flex justify-between items-center p-3 rounded-lg ${cardBg}`}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full ${iconBg}`}>{icon}</div>
        <div>
          <p className="font-medium text-gray-900">{title}</p>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
      <div className="flex items-center flex-col">
        <div
          className={`text-xs py-1 rounded-full min-w-[24px] max-w-[24px] text-center ${valueBg}`}
        >
          {value}
        </div>

        {valueLabel && (
          <span className="ml-1 font-normal text-xs text-gray-600">
            {valueLabel}
          </span>
        )}
      </div>
    </div>
  );
};

export default ServiceStatusCard;
