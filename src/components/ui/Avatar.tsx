import React from "react";

interface AvatarProps {
  size?: "xs" | "sm" | "md" | "lg";
  imageUrl?: string;
  altText?: string;
}

const sizeClasses = {
  xs: "w-6 h-6",
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
};

const defaultImage = "/icons/user.svg"; // Replace with your default image path

const Avatar: React.FC<AvatarProps> = ({
  size = "md",
  imageUrl,
  altText = "User Avatar",
}) => {
  const sizeClass = sizeClasses[size];

  return (
    <div className={`inline-block rounded-full overflow-hidden ${sizeClass}`}>
      <img
        src={imageUrl || defaultImage}
        alt={altText}
        className="object-cover w-full h-full"
      />
    </div>
  );
};

export default Avatar;
