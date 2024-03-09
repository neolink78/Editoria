import { Flex, Box, useColorModeValue, Button } from '@chakra-ui/react';

type Item = {
  label: string;
  value: string;
}

type MultipleChoiceProps = {
  items: Item[];
  value: string | null;
  onChange: (value: string | undefined) => void;
}

const MultipleChoice = ({
  items,
  value,
  onChange,
}: MultipleChoiceProps) => {
  const bgColor = useColorModeValue('black', 'white');
  const color = useColorModeValue('white', 'black');

  return (
    <Flex>
      {items.map((item) => {
        const hoverTextColor = 'black';
        const hoverBgColor = useColorModeValue('gray.200', 'gray.600');
        const isSelected = value === item.value;
        return (
          <Box
            as="button"
            key={item.value}
            onClick={() => onChange(item.value === value ? undefined : item.value)}
            p="0.3vw 1.4vw"
            borderRadius="0.3vw"
            bg={isSelected ? 'white' : bgColor}
            color={isSelected ? 'black' : color}
            _hover={{
              bg: hoverBgColor,
              color: hoverTextColor,
            }} transition="background 0.3s ease, color 0.3s ease"
            cursor="pointer"
            mx={2}
          >
            {item.label}
          </Box>
        );
      })}
    </Flex>
  );
}

export default MultipleChoice;
