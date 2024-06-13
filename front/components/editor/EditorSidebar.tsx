import { Box, Flex, Input, Text } from "@chakra-ui/react";
import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import { File, ProjectInfo } from "../../pages/editor";
import FilesList from "./FilesList";
import ProjectInfoTab from "./ProjectInfoTab";
import EditorComments from "./EditorComments";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

type EditorSidebarProps = {
  project: File[];
  setProject: Dispatch<SetStateAction<File[]>>;
  fileName: string | null;
  setFileName: Dispatch<SetStateAction<string | null>>;
  setFilesInTabs: Dispatch<SetStateAction<string[]>>;
  filesInTabs: string[];
  projectInfo: ProjectInfo;
  likes: number | undefined;
};

type ShowTabs = {
  Files: boolean;
  Comments: boolean;
  Info: boolean;
};

const SIDEBAR_TABS = ["Info", "Files", "Comments"];

const GET_COMMENTS = gql`
  query GetCommentsbyProjectId($projectId: String!) {
    getCommentsbyProjectId(projectId: $projectId) {
      content
      id
      createdAt
      updatedAt
      owner {
        id
        username
      }
    }
  }
`;

const EditorSidebar = ({
  projectInfo,
  project,
  setProject,
  fileName,
  setFileName,
  setFilesInTabs,
  filesInTabs,
  likes,
}: EditorSidebarProps) => {
  const router = useRouter();

  const { project: projectId } = router.query;
  const [showTabs, setShowTabs] = useState<ShowTabs>({
    Files: true,
    Comments: true,
    Info: true,
  });

  const { data: commentsData, refetch } = useQuery(GET_COMMENTS, {
    variables: { projectId: projectId as string },
  });

  const displayTabContent = (tab: string) => {
    switch (tab) {
      case "Files":
        return (
          <FilesList
            project={project}
            fileName={fileName}
            setProject={setProject}
            showTabs={showTabs}
            setFileName={setFileName}
            setFilesInTabs={setFilesInTabs}
            filesInTabs={filesInTabs}
          />
        );

      case "Comments":
        return (
          <EditorComments
            comments={commentsData?.getCommentsbyProjectId}
            refetch={refetch}
          />
        );

      default:
        return (
          <ProjectInfoTab
            info={projectInfo}
            likes={likes}
            comments={commentsData?.getCommentsbyProjectId?.length}
          />
        );
    }
  };

  return (
    <Flex
      className="editor-sidebar"
      w="240px"
      direction={"column"}
      backgroundColor={"#212227"}
      color="white"
    >
      {SIDEBAR_TABS.map((tab) => {
        return (
          <Fragment key={tab}>
            <Flex
              gap={2}
              alignItems="center"
              bg="#2F3138"
              className="p-1 cursor-pointer"
              onClick={() =>
                setShowTabs({
                  ...showTabs,
                  [tab]: !showTabs[tab as keyof ShowTabs],
                })
              }
            >
              <BiChevronRight
                style={{
                  transform: showTabs[tab as keyof ShowTabs]
                    ? "rotate(90deg)"
                    : "",
                }}
              />
              {tab}
            </Flex>
            {showTabs[tab as keyof ShowTabs] && displayTabContent(tab)}
          </Fragment>
        );
      })}
    </Flex>
  );
};

export default EditorSidebar;
