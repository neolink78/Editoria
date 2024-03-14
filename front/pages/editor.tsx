import { Box, Flex } from "@chakra-ui/react";
import Editor, { Monaco } from "@monaco-editor/react";
import { useState } from "react";

const files = {
  "index.html": {
    name: "index.html",
    language: "html",
    value: "<!-- Write your HTML -->",
  },
};

function CodeEditor() {
  const [fileName, setFileName] = useState<keyof typeof files>("index.html");
  const [output, setOutput] = useState<string>("");

  const file = files[fileName];

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

  const getLanguage = (fileName : string) => {
    if (fileName.endsWith(".js")) {
      return "javascript";
    } else if (fileName.endsWith(".css")) {
      return "css";
    } else if (fileName.endsWith(".html")) {
      return "html";
    }
  }

  const addFile = () => {
    const newFileName = prompt("Enter file name");
    if (newFileName) {
      files[newFileName] = {
        name: newFileName,
        language: getLanguage(newFileName),
        value: "// test file",
      };
      setFileName(newFileName);
    }
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
          <button onClick={addFile}>+</button>
          <Box>Depedencies</Box>
          <Box>Comments</Box>
        </Flex>
        <Flex direction={"column"} w="100%">
          <Box backgroundColor={"#212227"} color="white">
            {Object.keys(files).map((key) => (
              <button
                key={key}
                disabled={fileName === key}
                onClick={() => setFileName(key as keyof typeof files)}
                className={"py-2 px-4 text-sm "  + (fileName === key ? "bg-[#14181F]" : "bg-[#25292F]") + " hover:bg-[#14181F]"}
              >
                {key}
              </button>
            ))}
          </Box>
          <Flex>
            <Editor
              className="pt-2 bg-[#14181F]"
              height="calc(100vh - 92px)"
              width="60%"
              path={file.name}
              defaultLanguage={file.language}
              defaultValue={file.value}
              onChange={(value) => {
                files[fileName].value = value;
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
