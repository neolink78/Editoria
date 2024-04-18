import { FormErrorMessage, Input } from "@chakra-ui/react";

type InputFormProps = {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value?: string;
  color?: string;
  bg?: string;
  border?: string;
  borderRadius?: number | string;
  name?: string;
  error?: string;
  type?: "text" | "password" | "email";
};

const InputForm = ({
  onChange,
  onBlur,
  onFocus,
  placeholder,
  value,
  color = "#fbfbfb",
  bg = "#1C2333",
  border = "none",
  borderRadius = 10,
  name = "",
  error = "",
  type = "text",
}: InputFormProps) => {
  return (
    <div>
      <Input
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder={placeholder}
        value={value}
        color={color}
        bg={bg}
        border={border}
        borderRadius={borderRadius}
        name={name}
        isInvalid={!!error}
        type={type}
      />
    </div>
  );
};

export default InputForm;
