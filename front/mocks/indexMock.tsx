import ReactIcon from "../icons/reactIcon";

export interface MockType {
  marginTop: string;
  icon: JSX.Element;
  label: string;
  description: string;
  date: string;
  user: string;
}

const indexMock = [
  {
    marginTop: "1.8vw",
    icon: <ReactIcon width="2vw" />,
    label: "Project-title (forked)",
    description: "Project-description blabalbalalab",
    date: "9 months ago",
    user: "Novak",
  },
  {
    marginTop: "1.2vw",
    icon: <ReactIcon width="2vw" />,
    label: "Project-title (forked)",
    description: "Project-description blabalbalalab",
    date: "9 months ago",
    user: "John",
  },
  {
    marginTop: "1.2vw",
    icon: <ReactIcon width="2vw" />,
    label: "Amazing paralaX effect",
    description: "this is a parallax effect, using different algorithms and react",
    date: "9 months ago",
    user: "Mehmet",
  },
];

export default indexMock;
