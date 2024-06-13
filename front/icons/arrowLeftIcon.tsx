interface ArrowLeftIconProps {
  width?: string;
  color?: string;
  onClick?: () => void; // Ajoutez cette ligne
}

const ArrowLeftIcon = ({
  width = "28",
  color = "white",
  onClick
}: ArrowLeftIconProps) => (
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
      d="M11.1667 8.5H2.83333"
      stroke={color}
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.5 5L2.83333 8.5L5.5 12"
      stroke={color}
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ArrowLeftIcon;
