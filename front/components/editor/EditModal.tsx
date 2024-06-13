import { ProjectInfo } from "@/pages/editor";
import {
  Switch,
  Flex,
  Input,
  Textarea,
  Text,
  FormLabel,
  Box
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";

type EditModalProps = {
  info: ProjectInfo;
  setProjectInfo: Dispatch<SetStateAction<ProjectInfo>>;
};

function EditModal({ info, setProjectInfo }: EditModalProps) {
  return (
    <Flex
      direction={"column"}
      p={4}
      gap={4}
      w={"350px"}
      className="bg-gray-600"
    >
      <Box>
        <FormLabel>Title</FormLabel>
        <Input
          placeholder={info.title}
          w={"100%"}
          borderRadius={0}
          value={info.title}
          onChange={(e) => setProjectInfo({ ...info, title: e.target.value })}
        />
      </Box>
      <Box>
        <FormLabel>Description</FormLabel>
        <Textarea
          placeholder={info.description}
          borderRadius={0}
          value={info.description}
          w={"100%"}
          onChange={(e) =>
            setProjectInfo({ ...info, description: e.target.value })
          }
        />
      </Box>
      <Flex align={"center"} gap={4}>
        <Switch
          onChange={(e) =>
            setProjectInfo({ ...info, isPublic: e.target.checked })
          }
          checked={info.isPublic}
        />
        <Text fontSize="sm">Public</Text>
      </Flex>
    </Flex>
  );
}

export default EditModal;
