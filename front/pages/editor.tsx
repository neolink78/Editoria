import { Box, Flex, Input, Text } from "@chakra-ui/react";
import Editor, { Monaco } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";

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
  const [showInput, setShowInput] = useState<boolean>(false);
  const [newFileName, setNewFileName] = useState<string>("");
  const [showTabs, setShowTabs] = useState({
    files: false,
    comments: false,
    info: false,
  });

  useEffect(() => {
    const file = project.find((file) => file.name === fileName);
    if (file) setSelectedFile(file);
    else setSelectedFile(null);
  }, [fileName, project]);

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
      setNewFileName("");
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

  const getGeneratedPageURL = ({ html, css, js }: {html: string, css: string, js: string}) => {
  const getBlobURL = (code: string, type: string) => {
    const blob = new Blob([code], { type })
    return URL.createObjectURL(blob)
  }

  const cssURL = getBlobURL(css, 'text/css')
  const jsURL = getBlobURL(js, 'text/javascript')

  const source = `
    <html>
      <head>
        ${css && `<link rel="stylesheet" type="text/css" href="${cssURL}" />`}
        </head>
        <body>
        ${html || ''}
        ${js && `<script src="${jsURL}"></script>`}
      </body>
    </html>
  `

  return getBlobURL(source, 'text/html')
}

const url = getGeneratedPageURL({
  html: project.find((file) => file.language === "html")?.value || '',
  css: project.find((file) => file.language === "css")?.value || '',
  js: project.find((file) => file.language === "javascript")?.value || ''
})

  return (
    <>
      <Box w="100%" bg="#2F3138" p={4} color="white" className="editor-navbar">
        EDITORIA
      </Box>
      <Flex w="100%" className="editor-container">
        <Box w="65px" bg="#2F3138" className="editor-toolbar p-4"></Box>
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
                  className={"pl-8 pr-2 py-1 " + (fileName === file.name && !showInput ? "bg-[#1574EF] " : "") + (fileName !== file.name ? "hover:bg-[#25292F]" : "")}
                >
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
        <Flex direction={"column"} w="100%" className="editor-filetabs">
          <Box backgroundColor={project.length > 0 ? "#212227" : "#14181F"} color="white" className="min-h-9">
            {project.map((file) => (
              <button
                key={file.name}
                disabled={fileName === file.name}
                onClick={() => setFileName(file.name)}
                className={
                  "py-2 px-4 text-sm cursor-pointer " +
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
              onChange={(value: string) => {
                if (selectedFile) updateFile(selectedFile.name, value || "");
              }}
              onMount={handleEditorDidMount}
            />
            <Box w="40%">
              <iframe src={url} className="w-full h-full" />
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default CodeEditor;
