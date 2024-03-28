import { Box, Flex, Input, Text } from "@chakra-ui/react";
import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import { File } from "../../pages/editor";
import FilesList from "./FilesList";
import ProjectInfo from "./ProjectInfo";
import EditorComments from "./EditorComments";

type EditorSidebarProps = {
  project: File[];
  setProject: Dispatch<SetStateAction<File[]>>;
  fileName: string | null;
  setFileName: Dispatch<SetStateAction<string | null>>;
  setFilesInTabs: Dispatch<SetStateAction<string[]>>;
  filesInTabs: string[];
}

type ShowTabs = {
  Files: boolean;
  Comments: boolean;
  Info: boolean;
}

const SIDEBAR_TABS = ["Info", "Files", "Comments"]

const EditorSidebar = ({ project, setProject, fileName, setFileName, setFilesInTabs, filesInTabs }: EditorSidebarProps) => {

  const [showTabs, setShowTabs] = useState<ShowTabs>({
    Files: false,
    Comments: false,
    Info: false,
  });

  const displayTabContent = (tab: string) => {
    switch (tab) {
      case "Files":
        return <FilesList project={project} fileName={fileName} setProject={setProject} showTabs={showTabs} setFileName={setFileName} setFilesInTabs={setFilesInTabs} filesInTabs={filesInTabs} />;
      
      case "Comments":
        return <EditorComments />;
        
      default:
        return <ProjectInfo />
    }
  }

return (
  <Flex
    className="editor-sidebar"
    w="260px"
    direction={"column"}
    backgroundColor={"#212227"}
    color="white"
  >
    <Text className="p-4">PROJECT</Text>
    {SIDEBAR_TABS.map((tab) => {
      return (
        <Fragment key={tab}>
        <Flex
          alignItems="center"
          bg="#2F3138"
          className="p-1 cursor-pointer"
          onClick={() => setShowTabs({ ...showTabs, [tab]: !showTabs[tab as keyof ShowTabs] })}
        >
          <BiChevronRight
            style={{ transform: showTabs[tab as keyof ShowTabs] ? "rotate(90deg)" : "" }}
          />
          {tab}
        </Flex>
        {showTabs[tab as keyof ShowTabs] && <Box>{displayTabContent(tab)}</Box>}
        </Fragment>
      )
    })}
  </Flex>
)
}

export default EditorSidebar;