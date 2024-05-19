import SubmitButton from "@/lib/submitButton"
import { Box, Flex } from "@chakra-ui/react"
import Link from "next/link"

export const NewUser = () => {
    return (
        <Flex
            flexDirection="column"
            alignItems="center"
            height="100vh"
            textAlign="center"
        >
            <Box fontSize="1.4vw" mb="20px" mt="6rem">
                Bienvenue sur votre tableau de bord !
            </Box>
            <Box fontSize="1.1vw" mb="40px" w="30vw">
                Il semble que vous n&apos;avez pas encore de projets. Commencez votre premier projet maintenant et plongez dans le développement.
            </Box>
            <Link href="/editor" passHref>
                <SubmitButton
                    w="15vw"
                    bg="#1574EF"
                >
                    Créer un nouveau projet
                </SubmitButton>
            </Link>
        </Flex>
    )
}