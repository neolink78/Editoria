import Section from "../lib/section";
import { Flex, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Image from "next/image";
import SubmitButton from "../lib/submitButton";
import Tile from "../lib/tile";
import Layout from "../components/layout";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "@/graphql/queries/projectQueries";
import { useEffect, useState } from "react";
import { Error } from "@/lib/error";
import { UUID } from "crypto";
import { useLikes } from "../context/LikeContext";
import { GetOwnCommentsQuery, GetProjectsQuery } from "@/gql/graphql";
import { useAuth } from "@/context/UserContext";
import { GET_OWN_COMMENTS } from "@/graphql/queries/commentQueries";

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

  const { data: ownCommentsData } = useQuery<GetOwnCommentsQuery>(
    GET_OWN_COMMENTS,
  );

  const ownComments = ownCommentsData?.getOwnComments || [];

  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: MouseEvent) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    refetch();

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [router.query.page]);

  const handleOpenProject = (projectId: string) => {
    router.push(`/editor?project=${projectId}`);
  };

  const { handleToggleLike, likedProjects } = useLikes();

  if (loading)
    return (
      <Layout>
        <Flex justifyContent="center" alignItems="center" h="100vh">
          {" "}
          Loading ...{" "}
        </Flex>
      </Layout>
    );
  if (error) {
    console.log(error);
  }

  return (
    <Layout>
      <div
        className="fixed z-50 pointer-events-none"
        style={{
          width: "1000px",
          height: "1000px",
          background:
            "radial-gradient(circle, rgba(21, 116, 239, 0.5) 0%, rgba(21, 116, 239, 0) 70%)",
          opacity: 0.5,
          transform: `translate(${cursorPosition.x - 500}px, ${cursorPosition.y - 600}px)`,
          transition: "transform 0.1s ease-out",
          zIndex: 1,
        }}
      />
      <Flex
        justifyContent="center"
        alignItems="center"
        mt={40}
        direction="column"
        gap={4}
      >
        <h1 className="text-4xl font-bold tracking-tighter lg:text-6xl xl:text-7xl/none w-2/3 text-center">
          Unleash Your Coding Potential with{" "}
          <span className="text-[#1574ef]">Editoria</span>
        </h1>
        <p className="max-w-[600px] text-muted-foreground md:text-xl text-center">
          Editoria is the ultimate online code editor, empowering developers to
          create and collaborate with ease.
        </p>
        <SubmitButton bg="#1574EF" onClick={() => router.push("/editor")}>
          Try it out now !
        </SubmitButton>
      </Flex>
      <Box fontSize="2.5vw" m="8vw 10.8vw 0 11.2vw">
        Most popular projects
      </Box>
      <Box ml="11.6vw">
        {projects
          && projects
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
                isLiked={
                  likedProjects && likedProjects?.some((p) => p.id === e.id)
                }
                isCommented={ownComments && ownComments.some((c) => c.project.id === e.id)}
                onOpenProject={() => handleOpenProject(e.id)}
              />
            ))
        }
      </Box>
      <Flex justifyContent="center" mt="3vw" mb="4vw">
        <SubmitButton onClick={() => router.push("/projects")}>
          See all projects
        </SubmitButton>
      </Flex>
    </Layout>
  );
}
