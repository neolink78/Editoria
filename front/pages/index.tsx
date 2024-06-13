import Section from "../lib/section";
import { Flex, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Image from "next/image";
import SubmitButton from "../lib/submitButton";
import Tile from "../lib/tile";
import indexMock from "../mocks/indexMock";
import Layout from "../components/layout";
import { useQuery } from "@apollo/client";
import { GETPROJECTS } from "./projects";

export default function HomePage() {
  const router = useRouter();

  const { data, loading, error } = useQuery(GETPROJECTS, {
    variables: { limit: 5 },
  });
  const projects = data?.getProjects || [];
  console.log(projects);
  // TODO : use another query

  return (
    <Layout>
      <Flex className="header_main_title">
        <Box>Welcome to Editoria</Box>
        <Box>Our goal is to make you enjoying coding !</Box>
      </Flex>
      <Flex mt="5vw" justifyContent="center" gap="11.4vw" alignItems="center">
        <Section title="What's Editoria ?" buttonText="Try it out now !">
          Editoria an IDE allowing you to code with your mates anytime, anywhere
          !
        </Section>
        <Box
          style={{
            filter: "drop-shadow(0 0 2em #58a6ff80)",
            borderRadius: "1vw",
            overflow: "hidden",
            maxWidth: "29vw",
            maxHeight: "21.5vw",
            width: "100%",
            height: "auto",
          }}
        >
          <Image
            src="/code.webp"
            alt="home picture"
            width={600}
            height={600}
            layout="responsive"
            style={{ borderRadius: "1vw", width: "100%", height: "auto" }} // Adjust styles for responsiveness
          />
        </Box>
      </Flex>
      <Box fontSize="2.5vw" m="8vw 10.8vw 0 11.2vw">
        Most popular projects
      </Box>
      <Box ml="11.6vw">
        {projects.slice(-3).map((e: any, idx: any) => (
          <Tile
            ownerId={e.owner.id}
            homePage
            key={idx}
            marginTop={e.marginTop}
            icon={e.icon}
            label={e.label}
            description={e.description}
            date={e.date}
            onOpenProject={() => router.push(`/projects/${e.projectId}`)}
          />
        ))}
      </Box>
      <Flex justifyContent="center" mt="3vw" mb="4vw">
        <SubmitButton onClick={() => router.push("/projects")} w="10vw">
          See all projects
        </SubmitButton>
      </Flex>
    </Layout>
  );
}
