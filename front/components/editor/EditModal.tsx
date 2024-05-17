import { ProjectInfo } from "@/pages/editor";
import { Switch, Flex, Input, Textarea, Text } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";

type EditModalProps = {
  info: ProjectInfo;
setProjectInfo: Dispatch<SetStateAction<ProjectInfo>>;
};

function EditModal({ info, setProjectInfo }: EditModalProps) {
  return (
    <Flex direction={"column"} p={8} gap={4} w={"100%"} className="bg-gray-600">
      <Input placeholder={info.title} w={"auto"} borderRadius={0} value={info.title} onChange={(e) => setProjectInfo({...info, title: e.target.value})} />
      <Textarea placeholder={info.description} borderRadius={0} value={info.description} onChange={(e) => setProjectInfo({...info, description: e.target.value})}/>
      <Flex align={"center"} gap={4}>
        <Text>Public:</Text>
        <Switch onChange={(e) => setProjectInfo({...info, isPublic: e.target.checked})} checked={info.isPublic}/>
      </Flex>
    </Flex>
  );
}

export default EditModal;
