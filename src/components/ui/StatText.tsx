type StatTextProps = {
  label?: string;
  value?: string | number;
  description?: string;
};

const StatText = ({
  label = "",
  value = "",
  description = "",
}: StatTextProps) => {
  return (
    <div>
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  );
};

export default StatText;
