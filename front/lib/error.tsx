import { Box, Flex } from "@chakra-ui/react";

export const Error = () => {
  return (
    <Flex
      direction="column"
      align="center"
      h="100vh"
      textAlign="center"
      p={"40px"}
    >
      <Box fontSize={{ base: "32px", lg: "40px" }} mb="20px" mt="60px">
        Une erreur est survenue.
      </Box>
      <Box fontSize={"16px"} w={{ base: "100%", lg: "30vw" }}>
        Nous vous prions de nous excuser pour la gêne occasionnée. Veuillez
        réessayer plus tard.
      </Box>
    </Flex>
  );
};
