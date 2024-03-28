import { Box, Flex, Input, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";
import { File } from "../../pages/editor";
import { FaHtml5 } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";

type EditorSidebarProps = {
  project: File[];
  setProject: Dispatch<SetStateAction<File[]>>;
  fileName: string | null;
  setFileName: Dispatch<SetStateAction<string | null>>;
}

const EditorSidebar = ({ project, setProject, fileName, setFileName }: EditorSidebarProps) => {

  const [newFileName, setNewFileName] = useState<string>("");
  const [showInput, setShowInput] = useState<boolean>(false);
  const [showTabs, setShowTabs] = useState({
    files: false,
    comments: false,
    info: false,
  });


  const getLanguage = (fileName: string) => {
    if (fileName.endsWith(".js")) {
      return "javascript";
    } else if (fileName.endsWith(".css")) {
      return "css";
    } else {
      return "html";
    }
  };

  const addFile = () => {
    if (newFileName) {
      let language = getLanguage(newFileName);
      let fileValue;

      if (language === "javascript") {
        fileValue = "// Write your JavaScript";
      } else if (language === "css") {
        fileValue = "/* Write your CSS */";
      } else {
        fileValue = "<!-- Write your HTML -->";
      }

      setProject([
        ...project,
        {
          name: newFileName,
          language: language,
          value: fileValue,
        },
      ]);
      setFileName(newFileName);
      setShowInput(false);
      setNewFileName("");
    }
  };

  const showIcon = (language: string) => {
    switch (language) {
      case "html":
        return <FaHtml5 color="#F76904" />;
      case "css":
        return <FaCss3Alt color="#1574EF" />;
      case "javascript":
        return <IoLogoJavascript color="#F0DB4F" />;
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
    <Flex
      alignItems="center"
      bg="#2F3138"
      className="p-1 cursor-pointer"
      onClick={() => setShowTabs({ ...showTabs, info: !showTabs.info })}
    >
      <BiChevronRight
        style={{ transform: showTabs.info ? "rotate(90deg)" : "" }}
      />
      Info
    </Flex>
    <Flex
      alignItems="center"
      bg="#2F3138"
      className="p-1 cursor-pointer"
      onClick={() => setShowTabs({ ...showTabs, files: !showTabs.files })}
    >
      <BiChevronRight
        style={{ transform: showTabs.files ? "rotate(90deg)" : "" }}
      />
      Files
    </Flex>
    {showTabs.files && (
      <Flex direction={"column"}>
        {project.map((file) => (
          <Flex
          key={file.name}
          justifyContent={"space-between"}
          alignContent={"center"}
          className={"pl-6 pr-2 py-1 " + (fileName === file.name && !showInput ? "bg-[#1574EF] " : "") + (fileName !== file.name ? "hover:bg-[#25292F]" : "")}
          >
            <span className="mr-2">{ showIcon(file.language) }</span>
            <p
              onClick={() => setFileName(file.name)}
              className="text-xs cursor-pointer w-full"
            >
              {file.name}
            </p>
            <FaRegTrashAlt
              className="w-2 cursor-pointer opacity-40 hover:opacity-100"
              onClick={() =>
                setProject(
                  project.filter(
                    (projecFile) => projecFile.name !== file.name
                  )
                )
              }
            />
          </Flex>
        ))}
        {showInput && (
          <Input
            size={"xs"}
            width='auto'
            placeholder="file name"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addFile();
            }}
            className="text-xs ml-8"
          />
        )}
        {showTabs.files && (
          <button className="m-auto" onClick={() => setShowInput(true)}>+</button>
        )}
      </Flex>
    )}
    <Flex
      alignItems="center"
      bg="#2F3138"
      className="p-1 cursor-pointer"
      onClick={() =>
        setShowTabs({ ...showTabs, comments: !showTabs.comments })
      }
    >
      <BiChevronRight style={{ transform: showTabs.comments ? "rotate(90deg)" : "" }}/>
      Comments
    </Flex>
  </Flex>
)
}

export default EditorSidebar;