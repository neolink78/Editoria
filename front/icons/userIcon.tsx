import { useState } from "react";

const UserIcon = ({ width = "26", height = "26" }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <svg
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      width={width}
      height={height}
      viewBox="0 0 39 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        cursor: "pointer",
        stroke: isHovered ? "#dfdfdf" : "currentColor",
      }}
    >
      <path
        d="M1.00002 33.9981C5.78467 29.19 12.2801 26.2355 19.4341 26.2366C26.5881 26.2376 33.0827 29.194 37.8659 34.0035M28.653 9.73887C28.6523 14.563 24.5254 18.473 19.4353 18.4723C14.3451 18.4715 10.2194 14.5602 10.2201 9.73615C10.2208 4.91206 14.3477 1.00197 19.4378 1.00272C24.528 1.00347 28.6537 4.91477 28.653 9.73887Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default UserIcon;
