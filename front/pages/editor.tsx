import { Box, Flex } from "@chakra-ui/react";
import Editor, { Monaco } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import EditorSidebar from "../components/editor/EditorSidebar";

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
        <EditorSidebar project={project} fileName={fileName} setFileName={setFileName} setProject={setProject} />
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
