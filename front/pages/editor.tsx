import { Box, Flex, Input } from "@chakra-ui/react";
import Editor, { Monaco } from "@monaco-editor/react";
import { useEffect, useState } from "react";

type File = {
  name: string;
  language: string;
  value: string;
};

function CodeEditor() {
  const [fileName, setFileName] = useState<string | null>("index.html");
  const [project, setProject] = useState<File[]>([
    {
      name: "index.html",
      language: "html",
      value: "<!-- Write your HTML -->",
    },
  ]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [output, setOutput] = useState<string>("");
  const [showInput, setShowInput] = useState<boolean>(false);
  const [newFileName, setNewFileName] = useState<string>("");

  useEffect(() => {
    const file = project.find((file) => file.name === fileName);
    if (file) setSelectedFile(file);
  }, [fileName, project])

  useEffect(() => {
    console.log(project);
  }, [project]);
  const defineCustomTheme = (monaco: Monaco) => {
    monaco.editor.defineTheme("customTheme", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#14181F",
      },
    });
  };

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    if (!monaco) return;
    defineCustomTheme(monaco);
    monaco.editor.setTheme("customTheme");
  };

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
    }
  };

  const updateFile = (fileName: string, value: string) => {
    const newProject = project.map((file) => {
      if (file.name === fileName) {
        return {
          ...file,
          value,
        };
      }
      return file;
    });
    setProject(newProject);
  };

  return (
    <>
      <Box w="100%" bg="#2F3138" p={4} color="white">
        EDITORIA
      </Box>
      <Flex w="100%">
        <Box w="65px" bg="#2F3138" className="p-4"></Box>
        <Flex
          w="260px"
          direction={"column"}
          backgroundColor={"#212227"}
          color="white"
          className="p-4"
        >
          PROJECT
          <Box>Info</Box>
          <Box>Files</Box>
          {project.map((file) => (
            <p key={file.name} onClick={() => setFileName(file.name)}>
              {file.name}
            </p>
          ))}
          {showInput && (
            <Input
              placeholder="file name"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addFile();
              }}
            />
          )}
          <button onClick={() => setShowInput(true)}>+</button>
          <Box>Depedencies</Box>
          <Box>Comments</Box>
        </Flex>
        <Flex direction={"column"} w="100%">
          <Box backgroundColor={"#212227"} color="white">
            {project.map((file) => (
              <button
                key={file.name}
                disabled={fileName === file.name}
                onClick={() => setFileName(file.name)}
                className={
                  "py-2 px-4 text-sm " +
                  (fileName === file.name ? "bg-[#14181F]" : "bg-[#25292F]") +
                  " hover:bg-[#14181F]"
                }
              >
                {file.name}
              </button>
            ))}
          </Box>
          <Flex>
            <Editor
              className="pt-2 bg-[#14181F]"
              height="calc(100vh - 92px)"
              width="60%"
              path={selectedFile?.name}
              defaultLanguage={selectedFile?.language}
              defaultValue={selectedFile?.value}
              onChange={(value) => {
                if (selectedFile) updateFile(selectedFile.name, value || "");
              }}
              onMount={handleEditorDidMount}
            />
            <Box w="25%">
              <h2>Output :</h2>
              <p>{output}</p>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default CodeEditor;
