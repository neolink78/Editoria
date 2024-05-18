import { SiJavascript, SiTypescript, SiPython, SiCplusplus, SiCsharp, SiHtml5, SiC, SiCss3, SiHtmx } from 'react-icons/si';
import { Language } from '../gql/graphql';

export const getLanguageIcon = (language: Language) => {
  const iconStyle = { fontSize: '22px' };
  switch (language) {
    case 'JAVASCRIPT':
      return <SiJavascript color="yellow" style={iconStyle} />;
    case 'TYPESCRIPT':
      return <SiTypescript style={iconStyle} />;
    case 'PYTHON':
      return <SiPython style={iconStyle} />;
    case 'CPP':
      return <SiCplusplus style={iconStyle} />;
    case 'CSHARP':
      return <SiCsharp style={iconStyle} />;
    case 'HTML':
      return <SiHtml5 color="orange" style={iconStyle} />;
    case 'C':
      return <SiC style={iconStyle} />;
    case 'CSS':
      return <SiCss3 color="#1574EF" style={iconStyle} />;
    default:
      return <SiHtmx style={iconStyle} />;
  }
};
