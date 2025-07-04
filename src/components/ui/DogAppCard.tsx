import clsx from "clsx";

interface DogAppCardProps {
  size?: "large" | "medium" | "small";
  className?: string;
  children: React.ReactNode;
}

const DogAppCard: React.FC<DogAppCardProps> = ({
  size = "medium",
  className,
  children,
}) => {
  const paddingClasses = {
    large: "p-9", // 36px
    medium: "p-8", // 32px
    small: "p-7", // 28px
  };

  return (
    <div
      className={clsx(
        "bg-white dark:bg-gray-800 rounded-lg shadow-md",
        paddingClasses[size],
        className
      )}
      style={{}}
    >
      {children}
    </div>
  );
};

export default DogAppCard;
