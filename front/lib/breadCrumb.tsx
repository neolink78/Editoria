import { Flex, Box } from "@chakra-ui/react";

type Item = {
  label: string;
  value: string;
};

type breadcrumbProps = {
  items: Item[];
  value: string | null;
  className?: string;
  onChange: (value: string) => void;
  padding?: string;
};

const Breadcrumb = ({
  items,
  value,
  onChange,
  className,
  padding = "0.3vw 1.4vw",
}: breadcrumbProps) => {
  return (
    <Flex className="breadcrumb_container">
      {items.map((item) => {
        const selected = value === item.value;
        return (
          <Box
            opacity={selected ? 1 : 0.5}
            key={item.value}
            padding={padding}
            m="0.1vw"
            className={`breadcrumb_item_${selected ? "selected" : ""}`}
            onClick={() => onChange(item.value)}
          >
            {item.label}
          </Box>
        );
      })}
    </Flex>
  );
};

export default Breadcrumb;
