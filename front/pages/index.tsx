import Section from "../lib/section";
import { Flex, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Image from "next/image";
import SubmitButton from "../lib/submitButton";
import Tile from "../lib/tile";
import Layout from "../components/layout";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "@/graphql/queries/projectQueries";
import { useEffect } from "react";
import { Error } from "@/lib/error";
import { ProjectType } from "./user/[ownerId]";
import { UUID } from "crypto";

export default function HomePage() {
  const router = useRouter();

  const { data, loading, error, refetch } = useQuery(GET_PROJECTS, {
    variables: { limit: 5 },
  });
  const projects = data?.getProjects || [];
  const sortedProjects = [...projects]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 3);

  useEffect(() => {
    refetch();
  }, []);

  const handleOpenProject = (projectId: string) => {
    router.push(`/editor?project=${projectId}`);
  };

  if (loading) return <Layout>Loading...</Layout>;
  if (error) return <Error></Error>;
  return (
    <Layout>
      <Flex className="header_main_title">
        <Box>Welcome to Editoria</Box>
        <Box>We want you to enjoy coding !</Box>
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
          />
        </Box>
      </Flex>
      <Box fontSize="2.5vw" m="8vw 10.8vw 0 11.2vw">
        Most popular projects
      </Box>
      <Box ml="11.6vw">
        {projects
          ? sortedProjects
            .slice(-5)
            .map((e: ProjectType, idx: any) => (
              <Tile
                key={idx}
                icon={e.codeSnippetsOwned[0]?.language}
                title={e.title}
                description={e.description}
                owner={e.owner.username}
                ownerId={e.owner.id as UUID}
                createdAt={e.createdAt}
                onOpenProject={() => handleOpenProject(e.id)}
                commentCount={e.comments.length}
                homePage
              />
            ))
          : null}
      </Box>
      <Flex justifyContent="center" mt="3vw" mb="4vw">
        <SubmitButton onClick={() => router.push("/projects")} w="10vw">
          See all projects
        </SubmitButton>
      </Flex>
    </Layout>
  );
}
