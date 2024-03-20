import ReactIcon from "../icons/reactIcon";

export interface MockType {
  marginTop: string;
  icon: JSX.Element;
  label: string;
  description: string;
  date: string;
}

const indexMock = [
  {
    marginTop: "1.8vw",
    icon: <ReactIcon width="2vw" />,
    label: "Footer responsive",
    description: "Footer responsive using chakra-ui and react, with a toggle button",
    date: "6 months ago",
  },
  {
    marginTop: "1.2vw",
    icon: <ReactIcon width="2vw" />,
    label: "Styled button with shadow",
    description: "This is a button with a shadow and a hover effect, using chakra-ui and react",
    date: "7 months ago",
  },
  {
    marginTop: "1.2vw",
    icon: <ReactIcon width="2vw" />,
    label: "Amazing paralaX effect",
    description: "this is a parallax effect, using different algorithms and react",
    date: "9 months ago",
  },
];

export default indexMock;
