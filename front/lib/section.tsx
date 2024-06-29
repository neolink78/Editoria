import SubmitButton from "./submitButton";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

type sectionTypeProps = {
  title?: string;
  children?: string;
  buttonText?: string;
};

const Section = ({ title, children, buttonText }: sectionTypeProps) => {
  const router = useRouter();
  return (
    <Box color="white" width="32vw">
      <Box className="section_title">{title}</Box>
      <Box className="section_children">{children}</Box>
      {buttonText && (
        <Box mt="0.7vw">
          <SubmitButton
            bg="#1574EF"
            w="10vw"
            onClick={() => router.push("/editor")}
          >
            {buttonText}
          </SubmitButton>
        </Box>
      )}
    </Box>
  );
};

export default Section;
