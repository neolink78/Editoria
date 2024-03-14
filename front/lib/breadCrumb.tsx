import { Flex, Box } from '@chakra-ui/react'

type Item = {
  label: string
  value: string
}

type breadcrumbProps = {
  items: Item[]
  value: string | null
  className?: string
  onChange: (value: string | undefined) => void
  padding?: string
}

const Breadcrumb = ({
  items,
  value,
  onChange,
  className,
  padding = '0.3vw 1.4vw',
}: breadcrumbProps) => {
  return (
    <Flex className="breadcrumb_container">
      {items.map((item) => {
        const selected = value === item.value
        return (
          <Box
            key={item.value}
            padding={padding}
            mx="0.2vw"
            className={
              `breadcrumb_item_${selected ? 'selected' : ''} ${className}`
            }
            onClick={() => {
              if (item.value === value) {
                onChange(undefined)
              } else onChange(item.value)
            }}
          >
            {item.label}
          </Box>
        )
      })}
    </Flex>
  )
}

export default Breadcrumb