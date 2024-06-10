import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiCplusplus,
  SiCsharp,
} from "react-icons/si";
import { Language } from "../gql/graphql";

export const getLanguageIcon = (language: Language) => {
  const iconStyle = { fontSize: "22px" };
  switch (language) {
    case "JAVASCRIPT":
      return <SiJavascript color="yellow" style={iconStyle} />;
    case "TYPESCRIPT":
      return <SiTypescript style={iconStyle} />;
    case "PYTHON":
      return <SiPython style={iconStyle} />;
    case "CPP":
      return <SiCplusplus style={iconStyle} />;
    case "CSHARP":
      return <SiCsharp style={iconStyle} />;
    default:
      return <SiJavascript color="yellow" style={iconStyle} />; // Consider handling unexpected cases more gracefully
  }
};
