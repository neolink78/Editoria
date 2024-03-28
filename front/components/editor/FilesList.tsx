import { Flex, Input } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { FaCss3Alt, FaHtml5, FaRegTrashAlt, FaRegFile } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { File } from "../../pages/editor";
import { isClickOutside } from '../../utils/event'


type FilesListProps = {
  project: File[];
  setProject: Dispatch<SetStateAction<File[]>>;
  fileName: string | null;
  setFileName: Dispatch<SetStateAction<string | null>>;
  setFilesInTabs: Dispatch<SetStateAction<string[]>>;
  filesInTabs: string[];
  showTabs: {
    Files: boolean;
    Comments: boolean;
    Info: boolean;
  };
}

const FilesList = ({project, fileName, setProject, showTabs, setFileName, setFilesInTabs, filesInTabs }: FilesListProps) => {

    const [showInput, setShowInput] = useState<boolean>(false);
    const [newFileName, setNewFileName] = useState<string>("");
    const inputRef = useRef<HTMLInputElement | null>(null);

    const getLanguage = (fileName: string) => {
    if (fileName.endsWith(".js")) {
      return "javascript";
    } else if (fileName.endsWith(".css")) {
      return "css";
    } else if (fileName.endsWith(".html")){
      return "html";
    } else {
      return "unknown";
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
      } else if (language === "html"){
        fileValue = "<!-- Write your HTML -->";
      } else {
        fileValue = "// Write your code";
      }

      setProject([
        ...project,
        {
          name: newFileName,
          language: language,
          value: fileValue,
        },
      ]);
      setFilesInTabs((prevsState) => [...prevsState, newFileName]);
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
        return <FaCss3Alt color="#1D84C1" />;
      case "javascript":
        return <IoLogoJavascript color="#F0DB4F" />;

      default: 
        return <FaRegFile color="#fff" />
    }
  }

  const deleteFile = (fileName: string) => {
    setProject((prevState) => prevState.filter((file: File) => file.name !== fileName));
    setFileName(project[0].name);
    setFilesInTabs(filesInTabs.filter((file) => file !== fileName));
  }

/**
 * Handler for document click event that is outside $root element
 * @param event
 */
const clickOutsideHandler = (event: MouseEvent) => {
  if (showInput && inputRef && isClickOutside(event, inputRef.current)) {
    setShowInput(false)
  }
}

useEffect(() => {
  document.addEventListener("mousedown", clickOutsideHandler);
  
  return () => {
    document.removeEventListener("mousedown", clickOutsideHandler);
  };
})


  return (
        <Flex direction={"column"}>
        {project.map((file: File) => (
          <Flex
          key={file.name}
          justifyContent={"space-between"}
          alignContent={"center"}
          className={"pl-6 pr-2 py-1 " + (fileName === file.name && !showInput ? "bg-[#1574EF] " : "") + (fileName !== file.name ? "hover:bg-[#25292F]" : "")}
          >
            <span className="mr-2">{ showIcon(file.language) }</span>
            <p
              onClick={() => {
                setFileName(file.name)
                if(filesInTabs.indexOf(file.name) === -1) setFilesInTabs([...filesInTabs, file.name])
              }}
              className="text-xs cursor-pointer w-full"
            >
              {file.name}
            </p>
            <FaRegTrashAlt
              className="w-3 cursor-pointer opacity-40 hover:opacity-100"
              onClick={() => deleteFile(file.name)}
            />
          </Flex>
        ))}
        {showInput && (
          <Input
            ref={inputRef}
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
        {showTabs.Files && (
          <button className="m-auto" onClick={() => setShowInput(true)}>+</button>
        )}
      </Flex>
  )
}

export default FilesList;