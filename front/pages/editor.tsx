import { Box, Flex } from "@chakra-ui/react";
import Editor, { Monaco } from "@monaco-editor/react";
import { useState } from "react";

const files = {
  "script.js" : {
    name: "script.js",
    language: "javascript",
    value: "console.log('Hello, world!');",
  },
};

function CodeEditor() {
  const [fileName, setFileName] = useState<keyof typeof files>("script.js");
  const [output, setOutput] = useState<string>("");

  const file = files[fileName];

  const defineCustomTheme = (monaco: Monaco) => {
    monaco.editor.defineTheme("customTheme", {
      base: "vs-dark", // Utilisez 'vs' pour un thème clair
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#14181F",
      },
    });
  };

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    if (!monaco) return
    defineCustomTheme(monaco);
    monaco.editor.setTheme('customTheme')
  };

  return (
    <>
      <Box w="100%" bg="#2F3138" p={4} color="white">
        EDITORIA
      </Box>
      <Flex w="100%">
        <Box w="65px" bg="#2F3138" className="p-4"></Box>
        <Box w="260px" backgroundColor={"#212227"} color="white" className="p-4">
          PROJECT
        </Box>
        <Flex direction={"column"} w="100%">
          <Box backgroundColor={"#212227"} color="white">
            <button
              disabled={fileName === "script.js"}
              onClick={() => setFileName("script.js")}
              className="bg-[#14181F] py-2 px-4 text-sm"
            >
              script.js
            </button>
            <button>run code</button>
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
                // Update the code value in the files object when it changes
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