import { useLikes } from "@/context/LikeContext";
import { GetProjectQuery } from "@/gql/graphql";
import { ProjectInfo } from "@/pages/editor";
import { ApolloQueryResult } from "@apollo/client";
import { Box, Flex, Link, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { CiChat1 } from "react-icons/ci";

type ProjectInfoProps = {
  info: ProjectInfo;
  comments: number | undefined;
  likes: number | undefined;
  refetchProject: () => Promise<ApolloQueryResult<GetProjectQuery>>;
};

const ProjectInfoTab = ({
  info,
  likes,
  comments,
  refetchProject,
}: ProjectInfoProps) => {
  const { handleToggleLike, likedProjects } = useLikes();
  const router = useRouter();

  const isLiked = likedProjects?.some(
    (project) => project.id === router.query.project,
  );

  const handleToggle = async () => {
    try {
      await handleToggleLike(router.query.project as string);
      await refetchProject();
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <Flex direction={"column"} className="px-5 py-3">
      <Flex gap={4}>
        <Box>
          {info.owner?.image && (
            <Image
              src={info.owner.image}
              alt="profile picture"
              width={30}
              height={30}
            />
          )}
        </Box>
        {info.owner?.username && (
          <Link href={`/user/${info.owner.id}`} className="pb-4">
            {info.owner.username}
          </Link>
        )}
      </Flex>
      <Box fontSize="sm">{info.title}</Box>
      <Text fontSize="xs" className="opacity-60">
        {info.description}
      </Text>
      {router.query?.project && (
        <Flex gap={4} fontSize="xs" className="mt-2 opacity-60">
          <Flex gap={1} align={"center"}>
            <Text>{likes}</Text>
            {isLiked ? (
              <AiFillLike
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggle();
                }}
                cursor="pointer"
              />
            ) : (
              <AiOutlineLike
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggle();
                }}
                cursor="pointer"
              />
            )}
          </Flex>
          <Flex gap={1} align={"center"}>
            <Text>{comments}</Text>
            <CiChat1 />
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export default ProjectInfoTab;
