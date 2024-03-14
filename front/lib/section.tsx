import SubmitButton from "./submitButton";
import ArrowDownIcon from "../icons/arrowDownIcon";
import { Box } from "@chakra-ui/react";

type sectionTypeProps = {
  title?: string;
  children?: string;
  buttonText?: string;
};

const Section = ({ title, children, buttonText }: sectionTypeProps) => {
  return (
    <Box color="white" width="32vw">
      <Box className="section_title">{title}</Box>
      <Box className="section_children">{children}</Box>
      {buttonText && (
        <Box mt="0.7vw">
          <SubmitButton
            bg="#1574EF"
            w="10vw"
            onClick={() => alert("redirecting to IDE...")}
          >
            {buttonText}
          </SubmitButton>
        </Box>
      )}
    </Box>
  );
};

export default Section;
