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
import { UUID } from "crypto";
import { useLikes } from "../context/LikeContext";
import { GetProjectsQuery } from "@/gql/graphql";
import { useAuth } from "@/context/UserContext";

export default function HomePage() {
  const router = useRouter();
  const { user } = useAuth();
  const { data, loading, error, refetch } = useQuery<GetProjectsQuery>(
    GET_PROJECTS,
    {
      variables: { limit: 5, offset: 0, sortBy: "likes" },
      nextFetchPolicy: "cache-and-network",
    },
  );
  const projects = data?.getProjects.projects || [];
  // console.log("projects", projects);

  useEffect(() => {
    refetch();
  }, []);

  const handleOpenProject = (projectId: string) => {
    router.push(`/editor?project=${projectId}`);
  };

  const { handleToggleLike, likedProjects } = useLikes();

  if (loading) return <Layout><Flex justifyContent="center" alignItems="center" h="100vh"> Loading ... </Flex></Layout>;
  if (error) {
    console.log(error);
  }

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
            filter: "drop-shadow(0 0 2em #089b0b80)",
            borderRadius: "1vw",
            overflow: "hidden",
            maxWidth: "29vw",
            maxHeight: "21.5vw",
            width: "100%",
            height: "auto",
          }}
        >
          <Image
            src="/editoria.webp"
            alt="home picture"
            width={600}
            height={600}
            priority
          />
        </Box>
      </Flex>
      <Box fontSize="2.5vw" m="8vw 10.8vw 0 11.2vw">
        Most popular projects
      </Box>
      <Box ml="11.6vw">
        {projects
          ? projects
              .map((e, idx) => (
                <Tile
                  homePage
                  projectId={e.id}
                  key={idx}
                  icon={e.codeSnippetsOwned[0]?.language}
                  title={e.title}
                  description={e.description}
                  createdAt={e.createdAt}
                  commentCount={e?.comments.length}
                  owner={e.owner.id === user?.id ? "" : e.owner.username}
                  ownerId={e.owner.id as UUID}
                  likeCount={e?.likes.length}
                  toggleLike={() => {
                    handleToggleLike(e.id);
                    refetch();
                  }}
                  isLiked={likedProjects?.some((p) => p.id === e.id)}
                  // isCommented={ownComments.some((c) => c.project.id === e.id)}
                  onOpenProject={() => handleOpenProject(e.id)}
                />
              ))
              .sort((a, b) => b.props.likeCount - a.props.likeCount)
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
