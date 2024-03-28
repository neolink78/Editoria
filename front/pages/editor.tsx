import { Box, Center, Flex } from "@chakra-ui/react";
import Editor, { Monaco } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import EditorSidebar from "../components/editor/EditorSidebar";
import { IoClose } from "react-icons/io5";
import { FaCss3Alt, FaHtml5 } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";

export type File = {
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
  const [filesInTabs, setFilesInTabs] = useState<string[]>(["index.html"]);

  useEffect(() => {
    const file = project.find((file) => file.name === fileName);
    if (file) setSelectedFile(file);
    else setSelectedFile(null);
  }, [fileName, project]);

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

  const showIcon = (name: string) => {
    const file = project.find((el) => el.name === name)
    if(!file) return null;
    switch (file.language) {
      case "html":
        return <FaHtml5 color="#F76904" />;
      case "css":
        return <FaCss3Alt color="#1D84C1" />;
      case "javascript":
        return <IoLogoJavascript color="#F0DB4F" />;
    }
  }

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

const removeFileFromTabs = (fileName: string) => {
  setFilesInTabs((prevState) => {
    const updatedTabs = prevState.filter((fileInTab) => fileInTab !== fileName);
    if(selectedFile?.name === fileName) setFileName(updatedTabs[0]);
    return updatedTabs;
  });
}
  return (
    <>
      <Box w="100%" bg="#2F3138" p={4} color="white" className="editor-navbar">
        EDITORIA
      </Box>
      <Flex w="100%" className="editor-container">
        <Box w="65px" bg="#2F3138" className="editor-toolbar p-4"></Box>
        <EditorSidebar project={project} fileName={fileName} setFileName={setFileName} setProject={setProject} setFilesInTabs={setFilesInTabs} filesInTabs={filesInTabs} />
        <Flex direction={"column"} w="100%" className="editor-filetabs">
          <Flex className="min-h-9">
            <Flex backgroundColor={project.length > 0 ? "#212227" : "#14181F"} color="white" width={"60%"}>
              {filesInTabs.map((file) => (
                <Center
                  key={file}
                  className={
                    "text-sm cursor-pointer pl-2 pr-1 " +
                    (fileName === file ? "bg-[#14181F]" : "bg-[#25292F]")
                  }
                >
                  <span className="mr-2">{ showIcon(file) }</span>
                  <p className="py-2 pr-2" onClick={() => setFileName(file)}>{file}</p>
                  <Center className="p-1 rounded hover:bg-[#2F3138]">
                    <IoClose color="white" onClick={() => removeFileFromTabs(file)}>x</IoClose>
                  </Center>
                </Center>
              ))}
            </Flex>
            <Box width={"40%"} bg={"#212227"} color={"white"}>
              TODO : mettre icons
            </Box>
          </Flex>
          <Flex>
            {filesInTabs.length !== 0 ? 
              <Editor
                className="pt-2 bg-[#14181F]"
                height="calc(100vh - 92px)"
                width="60%"
                path={selectedFile?.name}
                language={selectedFile?.language}
                value={selectedFile?.value}
                onChange={(value: string) => {
                  if (selectedFile) updateFile(selectedFile.name, value || "");
                }}
                onMount={handleEditorDidMount}
              />
              :
              <Box height={"calc(100vh - 92px)"} width="60%" bg={"#14181F"}/>
            }
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
