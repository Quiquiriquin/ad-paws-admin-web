"use client";

import { Avatar } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const DogAvatarList = ({
  dogs,
  activeDog = 0,
  onDogSelect,
  activeDogName = "",
  onDeleteDog,
}: {
  dogs?: any[];
  activeDog?: any;
  onDogSelect: (dog: any, index: number) => void;
  onDeleteDog?: (index: number) => void;
  activeDogName?: string;
}) => {
  console.log("Dogs in DogAvatarList:", dogs);
  return (
    <div className="flex gap-3 md:gap-4">
      {dogs?.map((dog, index) => (
        <div
          className="flex flex-col items-center relative flex-shrink-0"
          key={dog.name}
        >
          {onDeleteDog && dogs?.length > 1 && (
            <div
              className="absolute flex items-center justify-center w-[20px] h-[20px] md:w-[24px] md:h-[24px] top-[-6px] right-[-6px] md:top-[-8px] md:right-[-8px] bg-red-300 rounded-full cursor-pointer hover:bg-red-400 transition-colors z-10"
              onClick={() => onDeleteDog(index)}
            >
              <DeleteOutlined className="text-xs md:text-sm" />
            </div>
          )}
          <Avatar
            onClick={() => onDogSelect(dog, index)}
            className="border border-forest-200 rounded-lg p-4 md:p-6 bg-forest-200/30 cursor-pointer hover:bg-forest-300 transition-colors"
            size={window.innerWidth < 768 ? "default" : "large"}
          >
            {index === activeDog
              ? activeDogName.charAt(0).toLocaleUpperCase() || "N"
              : (dog?.name || "N").charAt(0).toLocaleUpperCase()}
          </Avatar>
          <label className="text-xs text-center mt-1 md:mt-2 truncate w-[48px] md:w-[52px]">
            {index === activeDog ? activeDogName || "..." : dog.name}
          </label>
        </div>
      ))}
    </div>
  );
};

export default DogAvatarList;
