import { Input } from "@chakra-ui/react";

type InputFormProps = {
  onChange?: () => void;
  placeholder?: string;
  value?: string;
  color?: string;
  bg?: string;
  border?: string;
  borderRadius?: number | string;
  name?: string;
  type?: "text" | "password" | "email";
};

const InputForm = ({
  onChange,
  placeholder,
  value,
  color = "#fbfbfb",
  bg = "#1C2333",
  border = "none",
  borderRadius = 10,
  name = "",
  type = "text",
}: InputFormProps) => {
  return (
    <Input
      onChange={onChange}
      placeholder={placeholder}
      value={value}
      color={color}
      bg={bg}
      border={border}
      borderRadius={borderRadius}
      name={name}
      type={type}
    />
  );
};

export default InputForm;
