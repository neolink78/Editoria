import { ApolloProvider } from "@apollo/client";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { Global } from "@emotion/react";
import { AppProps } from "next/app";
import "../styles/globals.css";
import theme from "../styles/theme";
import createApolloClient from "./apollo-client";

const Fonts = () => (
  <Global
    styles={`
      /* latin */
      @font-face {
        font-family: 'Montserrat Regular';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('/fonts/Montserrat-Regular.ttf') format('truetype');
      }
      @font-face {
        font-family: 'Montserrat Medium';
        font-style: normal;
        font-weight: 500;
        font-display: swap;
        src: url('/fonts/Montserrat-Medium.ttf') format('truetype');
      }
      @font-face {
        font-family: 'Montserrat SemiBold';
        font-style: normal;
        font-weight: 600;
        font-display: swap;
        src: url('/fonts/Montserrat-SemiBold.ttf') format('truetype');
      }
      @font-face {
        font-family: 'Montserrat Bold';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url('/fonts/Montserrat-Bold.ttf') format('truetype');
      }
      @font-face {
        font-family: 'Montserrat ExtraBold';
        font-style: normal;
        font-weight: 800;
        font-display: swap;
        src: url('/fonts/Montserrat-ExtraBold.ttf') format('truetype');
      }
    `}
  />
);

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = createApolloClient();

  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider theme={theme}>
        <CSSReset />
        <Fonts />
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}
