import { ChakraProvider } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { AppProps } from "next/app";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      
      <Component {...pageProps} />
    
    </ChakraProvider>
  );
}
