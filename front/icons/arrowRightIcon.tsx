interface ArrowRightIconProps {
  width?: string;
  color?: string;
  onClick?: () => void;
}

const ArrowRightIcon = ({
  width = "28",
  color = "white",
  onClick
}: ArrowRightIconProps) => (
  <svg
    width={width}
    height={width}
    fill="none"
    viewBox="0 0 17 17"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
    cursor="pointer"
  >
    <path
      d="M5.83333 8.5H14.1667"
      stroke={color}
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.5 5L14.1667 8.5L11.5 12"
      stroke={color}
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ArrowRightIcon;
