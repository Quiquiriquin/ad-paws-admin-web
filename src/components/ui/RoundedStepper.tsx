import { useMemo } from "react";

const RoundedStepper = ({ stepActive = 1, howManySteps = 2 }) => {
  const howManyStepsArray = useMemo(
    () => Array(howManySteps).fill(0),
    [howManySteps]
  );
  return (
    <div className="flex justify-center mt-4 mb-4">
      {/* Steps Indicator */}
      <div className="flex gap-4">
        {howManyStepsArray.map((_, index: number) => (
          <div
            className={`w-4 h-4 rounded-full flex items-center justify-center ${index + 1 <= stepActive ? "bg-forest-500 border-4 border-forest-500" : "bg-forest-200 border-4 border-forest-200"} `}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default RoundedStepper;
