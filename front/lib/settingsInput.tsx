import { Box, Input } from "@chakra-ui/react";

type InputType = {
  label: string;
  placeholder: string;
  value: string;
  onChange: any;
  error?: any;
  name: string;
  disabled?: boolean;
};

const SettingsInput = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  name,
  disabled,
}: InputType) => {
  return (
    <Box>
      <Box fontSize="1.5vw" fontWeight={600} mt="1.9vw">
        {label}
      </Box>
      <Input
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        mt="0.5vw"
        fontSize="1.2vw"
        pl="0"
        border="none"
        name={name}
      />
      {error ? (
        <Box mt="0.2vw" color="red">
          {error}
        </Box>
      ) : null}
    </Box>
  );
};

export default SettingsInput;
