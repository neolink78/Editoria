import SubmitButton from "./submitButton"
import ArrowDownIcon from "../icons/arrowDownIcon"
import { Box } from "@chakra-ui/react"

type sectionTypeProps = {
    title?: string,
    children?: string,
    buttonText?: string
}

const Section = ({ title, children, buttonText}: sectionTypeProps) => {
    return (
        <Box color="white" width="32vw">
            <Box className="section_title">{title}</Box>
            <Box className="section_children">{children}</Box>
            {buttonText && <Box  w='10vw' mt='0.7vw'>
                <SubmitButton  
                onClick={() => alert('redirecting to IDE...')}
                icon={<ArrowDownIcon width="0.8vw" />}
                >
                {buttonText}
                </SubmitButton>
            </Box> }
        </Box>
    )
}

export default Section