import { Box, Flex } from "@chakra-ui/react"

export const Error = () => {
    return (
        <Flex
            direction="column"
            align="center"
            h="100vh"
            textAlign="center"
        >
            <Box fontSize="1.4vw" mb="20px" mt="6rem">
                Erreur !    </Box>
            <Box fontSize="1.1vw" mb="40px" w="30vw">
                Nous vous prions de nous excuser pour la gêne occasionnée. Veuillez réessayer plus tard.
            </Box>
        </Flex>
    )
}