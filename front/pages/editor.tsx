import { Box, Center, Flex, Text, useToast } from "@chakra-ui/react";
import Link from "next/link";
import Editor, { Monaco } from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import EditorSidebar from "../components/editor/EditorSidebar";
import { IoClose } from "react-icons/io5";
import { FaCss3Alt, FaHtml5, FaRegFile } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import { IoLogoJavascript } from "react-icons/io5";
import SubmitButton from "../lib/submitButton";
import { LuSave } from "react-icons/lu";
import { gql, useMutation, useQuery } from "@apollo/client";
import {
  AddFileMutation,
  AddFileMutationVariables,
  CreateProjectMutation,
  CreateProjectMutationVariables,
  DeleteCodeSnippetMutation,
  DeleteCodeSnippetMutationVariables,
  GetProjectQuery,
  GetProjectQueryVariables,
  Language,
  UpdateFileMutation,
  UpdateFileMutationVariables,
  UpdateProjectMutation,
  UpdateProjectMutationVariables,
} from "@/gql/graphql";
import { useRouter } from "next/router";
import EditModal from "@/components/editor/EditModal";
import { isClickOutside } from "../utils/event";
import { useAuth } from "@/context/UserContext";
import LoginModal from "@/components/loginModal";
import UserIcon from "@/icons/userIcon";
import UserDropdown from "@/components/user/userDropdown";

export type File = {
  id: string;
  name: string;
  language: Language;
  value: string;
};

export type ProjectInfo = {
  id: string;
  title: string;
  description: string;
  isPublic: boolean;
  owner: {
    id: string;
    username: string;
    email: string;
    image: string;
  };
};

const DELETE_FILE = gql`
  mutation DeleteCodeSnippet($deleteCodeSnippetId: ID!) {
    deleteCodeSnippet(id: $deleteCodeSnippetId) {
      id
    }
  }
`;

const CREATE_PROJECT = gql`
  mutation CreateProject(
    $title: String!
    $isPublic: Boolean!
    $description: String
  ) {
    createProject(
      title: $title
      is_public: $isPublic
      description: $description
    ) {
      id
      owner {
        email
        id
        username
        image
      }
    }
  }
`;

const ADD_FILE = gql`
  mutation AddFile(
    $title: String!
    $code: String!
    $language: Language!
    $projectId: String!
  ) {
    createCodeSnippet(
      title: $title
      code: $code
      language: $language
      projectId: $projectId
    ) {
      id
    }
  }
`;

const UPDATE_FILE = gql`
  mutation UpdateFile(
    $updateCodeSnippetId: ID!
    $code: String!
    $title: String!
    $language: Language!
    $projectId: String!
  ) {
    updateCodeSnippet(
      id: $updateCodeSnippetId
      code: $code
      title: $title
      language: $language
      projectId: $projectId
    ) {
      code
      id
    }
  }
`;

const GET_PROJECT = gql`
  query GetProject($getProjectByIdId: ID!) {
    getProjectById(id: $getProjectByIdId) {
      codeSnippetsOwned {
        code
        id
        language
        title
      }
      description
      is_public
      title
      likes {
        id
      }
      owner {
        username
        id
        email
        image
      }
    }
  }
`;

const UPDATE_PROJECT = gql`
  mutation UpdateProject(
    $title: String!
    $isPublic: Boolean!
    $updateProjectId: ID!
    $description: String
  ) {
    updateProject(
      title: $title
      is_public: $isPublic
      id: $updateProjectId
      description: $description
    ) {
      id
    }
  }
`;

function CodeEditor() {
  const router = useRouter();
  const { user } = useAuth();
  const toast = useToast();
  const { project: projectId } = router.query;
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string | null>("index.html");
  const [projectInfo, setProjectInfo] = useState<ProjectInfo>({
    id: "",
    title: "Nouveau projet",
    description: "",
    isPublic: false,
    owner: {
      id: "",
      username: "",
      email: "",
      image: "",
    },
  });
  const [project, setProject] = useState<File[]>([
    {
      id: "",
      name: "index.html",
      language: Language.Html,
      value: "<!-- Write your HTML -->",
    },
  ]);

  const [filesInTabs, setFilesInTabs] = useState<string[]>(["index.html"]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState(false);
  const userIconRef = useRef<HTMLInputElement | null>(null);
  const modalRef = useRef<HTMLInputElement | null>(null);
  const editRef = useRef<HTMLInputElement | null>(null);

  const isNewProject = !router.query.project;

  const selectedFile = project.find((file) => file.name === fileName);

  const isOwnProject = projectInfo.owner.id === user?.id;

  const displaySaveButton = isOwnProject || !router.query.project;

  const [createProjectMutation] = useMutation<
    CreateProjectMutation,
    CreateProjectMutationVariables
  >(CREATE_PROJECT);

  const [addFileMutation] = useMutation<
    AddFileMutation,
    AddFileMutationVariables
  >(ADD_FILE);

  const [updateFileMutation] = useMutation<
    UpdateFileMutation,
    UpdateFileMutationVariables
  >(UPDATE_FILE);

  const [UpdateProjectMutation] = useMutation<
    UpdateProjectMutation,
    UpdateProjectMutationVariables
  >(UPDATE_PROJECT);

  const [deleteFileMutation] = useMutation<
    DeleteCodeSnippetMutation,
    DeleteCodeSnippetMutationVariables
  >(DELETE_FILE);

  const { data, refetch: refetchProject } = useQuery<
    GetProjectQuery,
    GetProjectQueryVariables
  >(GET_PROJECT, { variables: { getProjectByIdId: projectId as string } });

  useEffect(() => {
    if (data && projectId) {
      setProjectInfo({
        id: projectId as string,
        title: data.getProjectById.title,
        description: data.getProjectById.description,
        isPublic: data.getProjectById.is_public,
        owner: {
          id: data.getProjectById.owner.id,
          username: data.getProjectById.owner.username,
          email: data.getProjectById.owner.email,
          image: data.getProjectById.owner.image,
        },
      });
      setProject(
        data.getProjectById.codeSnippetsOwned.map((snippet) => ({
          id: snippet.id,
          name: snippet.title,
          language: snippet.language,
          value: snippet.code,
        })),
      );
      setFilesInTabs(
        data.getProjectById.codeSnippetsOwned.map((snippet) => snippet.title),
      );
    }
  }, [data]);
  const createProject = async () => {
    try {
      const { data } = await createProjectMutation({
        variables: {
          title: projectInfo.title,
          isPublic: projectInfo.isPublic,
          description: projectInfo.description,
        },
      });
      if (data && data.createProject?.id) {
        setProjectInfo({
          ...projectInfo,
          id: data.createProject.id,
          owner: {
            id: data.createProject.owner.id,
            username: data.createProject.owner.username,
            email: data.createProject.owner.email,
            image: data.createProject.owner.image,
          },
        });
        router.push(`/editor?project=${data.createProject.id}`);
        await addProject(data.createProject.id);
      }
      refetchProject();
    } catch (error) {
      console.error(error);
    }
  };

  const addProject = async (id: string) => {
    try {
      for (const file of project) {
        const { data } = await addFileMutation({
          variables: {
            title: file.name,
            code: file.value,
            language: file.language,
            projectId: id,
          },
        });
        if (data && data.createCodeSnippet?.id) {
          setProject((prevState) =>
            prevState.map((el) => {
              if (el.name === file.name) {
                return {
                  ...el,
                  id: data.createCodeSnippet.id,
                };
              }
              return el;
            }),
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateProject = async () => {
    try {
      await UpdateProjectMutation({
        variables: {
          title: projectInfo.title,
          isPublic: projectInfo.isPublic,
          updateProjectId: projectId as string,
          description: projectInfo.description,
        },
      });

      const fileToDelete = data?.getProjectById.codeSnippetsOwned.filter(
        (snippet) => !project.find((el) => el.id === snippet.id),
      );
      if (fileToDelete?.length) {
        for (const file of fileToDelete) {
          await deleteFileMutation({
            variables: {
              deleteCodeSnippetId: file.id,
            },
          });
        }
      }

      for (const file of project) {
        if (!file.id) {
          await addFileMutation({
            variables: {
              title: file.name,
              code: file.value,
              language: file.language,
              projectId: projectId as string,
            },
          });
        } else {
          await updateFileMutation({
            variables: {
              updateCodeSnippetId: file.id,
              code: file.value,
              title: file.name,
              language: file.language,
              projectId: projectId as string,
            },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async () => {
    if (router.query.project) {
      await updateProject();
      refetchProject();
      toast({
        title: "Project saved",
        status: "success",
        position: "top",
        duration: 3000,
        isClosable: true,
        colorScheme: "blue",
      });
    } else {
      await createProject();
    }
  };

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
    const file = project.find((el) => el.name === name);
    if (!file) return null;
    switch (file.language) {
      case Language.Html:
        return <FaHtml5 color="#F76904" />;
      case Language.Css:
        return <FaCss3Alt color="#1D84C1" />;
      case Language.Javascript:
        return <IoLogoJavascript color="#F0DB4F" />;
      default:
        return <FaRegFile color="#fff" />;
    }
  };

  const getGeneratedPageURL = ({
    html,
    css,
    js,
  }: {
    html: string;
    css: string;
    js: string;
  }) => {
    const getBlobURL = (code: string, type: string) => {
      const blob = new Blob([code], { type });
      return URL.createObjectURL(blob);
    };

    const cssURL = getBlobURL(css, "text/css");
    const jsURL = getBlobURL(js, "text/javascript");

    const source = `
    <html>
      <head>
        ${css && `<link rel="stylesheet" type="text/css" href="${cssURL}" />`}
        </head>
        <body>
        ${html || ""}
        ${js && `<script src="${jsURL}"></script>`}
      </body>
    </html>
  `;

    return getBlobURL(source, "text/html");
  };

  const url = getGeneratedPageURL({
    html: project.find((file) => file.language === Language.Html)?.value || "",
    css: project.find((file) => file.language === Language.Css)?.value || "",
    js:
      project.find((file) => file.language === Language.Javascript)?.value ||
      "",
  });

  const removeFileFromTabs = (fileName: string) => {
    setFilesInTabs((prevState) => {
      const updatedTabs = prevState.filter(
        (fileInTab) => fileInTab !== fileName,
      );
      if (selectedFile?.name === fileName) setFileName(updatedTabs[0]);
      return updatedTabs;
    });
  };

  useEffect(() => {
    document.addEventListener("mousedown", clickOutsideHandler);

    return () => {
      document.removeEventListener("mousedown", clickOutsideHandler);
    };
  });

  /**
   * Close modal when clicking outside
   * @param event
   */
  const clickOutsideHandler = (event: MouseEvent) => {
    if (
      openModal &&
      modalRef &&
      isClickOutside(event, modalRef.current) &&
      isClickOutside(event, userIconRef.current)
    ) {
      setOpenModal(false);
    } else if (
      isEditOpen &&
      editRef &&
      isClickOutside(event, editRef.current)
    ) {
      setIsEditOpen(false);
    }
  };

  return (
    <>
      {isModalOpen && <LoginModal closeModal={() => setIsModalOpen(false)} />}
      <Flex
        w="100%"
        bg="#2F3138"
        p={4}
        color="white"
        align={"center"}
        justify={"space-between"}
        className="relative"
      >
        <Flex gap={"16px"} align={"center"}>
          <Link href="/" className="leading-8">
            EDITORIA
          </Link>
          {displaySaveButton && (
            <Flex
              align={"center"}
              gap={2}
              borderRadius={4}
              py={1}
              px={2}
              className="hover:outline hover:outline-1 hover:outline-gray-400 hover:bg-gray-600 cursor-pointer transition-colors ease-out"
              onClick={handleSave}
            >
              <LuSave color="white" /> <Text>Save</Text>
            </Flex>
          )}
        </Flex>
        {user && (
          <Box
            cursor="pointer"
            onClick={() => setOpenModal((modal) => !modal)}
            ref={userIconRef}
          >
            <UserIcon />
          </Box>
        )}
        <Box ref={modalRef} className="absolute right-4 top-16 z-10">
          <UserDropdown isVisible={openModal} />
        </Box>
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {!isNewProject || user ? (
            <>
              <Flex align={"center"} gap={4} position={"relative"}>
                <Text>{projectInfo.title}</Text>
                {displaySaveButton && (
                  <MdOutlineEdit
                    className="cursor-pointer"
                    onClick={() => setIsEditOpen(true)}
                  />
                )}
              </Flex>
              {isEditOpen && (
                <div
                  ref={editRef}
                  className="absolute left-1/2 translate-x-[-50%]"
                >
                  <EditModal
                    info={projectInfo}
                    setProjectInfo={setProjectInfo}
                  />
                </div>
              )}
            </>
          ) : (
            <SubmitButton bg="#1574EF" onClick={() => setIsModalOpen(true)}>
              Sign in to save your project
            </SubmitButton>
          )}
        </Box>
      </Flex>
      <Flex w="100%" className="editor-container" height="calc(100vh - 64px)">
        <EditorSidebar
          project={project}
          fileName={fileName}
          setFileName={setFileName}
          setProject={setProject}
          setFilesInTabs={setFilesInTabs}
          filesInTabs={filesInTabs}
          projectInfo={projectInfo}
          likes={data?.getProjectById.likes.length}
          refetchProject={refetchProject}
        />
        <Flex
          direction={"column"}
          w="calc(100% - 240px)"
          className={isEditOpen ? "z-[-1]" : ""}
        >
          <Flex className="min-h-9">
            <Flex
              backgroundColor={project.length > 0 ? "#212227" : "#14181F"}
              color="white"
              width={"100%"}
            >
              {filesInTabs.map((file) => (
                <Center
                  key={file}
                  className={
                    "text-sm cursor-pointer pl-2 pr-1 " +
                    (fileName === file ? "bg-[#14181F]" : "bg-[#25292F]")
                  }
                >
                  <Center onClick={() => setFileName(file)}>
                    <span className="mr-2">{showIcon(file)}</span>
                    <p className="py-2 pr-2">{file}</p>
                  </Center>
                  <Center className="p-1 rounded hover:bg-[#2F3138]">
                    <IoClose
                      color="white"
                      onClick={() => removeFileFromTabs(file)}
                    >
                      x
                    </IoClose>
                  </Center>
                </Center>
              ))}
            </Flex>
          </Flex>
          <Flex>
            {filesInTabs.length !== 0 ? (
              <Editor
                className="pt-2 bg-[#14181F]"
                height="calc(100vh - 100px)"
                width="60%"
                path={selectedFile?.name}
                language={selectedFile?.language.toLowerCase()}
                value={selectedFile?.value}
                onChange={(value: string | undefined) => {
                  if (selectedFile) updateFile(selectedFile.name, value || "");
                }}
                onMount={handleEditorDidMount}
              />
            ) : (
              <Box height="calc(100vh - 100px)" width="60%" bg={"#14181F"} />
            )}
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
