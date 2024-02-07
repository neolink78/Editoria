import { Flex } from "@chakra-ui/react"
import { ReactNode } from "react"
import LikeIcon from "../icons/likeIcon"
import CommentIcon from "../icons/commentIcon"

type TileProps = {
    icon?: ReactNode
    label?: string
    description?: string
    date?: string
    marginTop?: string
}


const Tile = ({icon, label, description, date, marginTop}: TileProps ) => {
    return (
<Flex
        justifyContent="space-between"
        alignItems="center"
        p="0.8vw 1.5vw"
        borderRadius="2vw"
        width="78.8vw"
        bg="#2F3138"
        mt={marginTop}
      >
        <Flex>
          {icon}
          {label}
        </Flex>
        {description}
        <Flex gap='1vw'>
            <Flex alignItems='center'> <LikeIcon /> 1 </Flex>
            <Flex alignItems='center'> <CommentIcon /> 3 </Flex>
             {date}
             </Flex>.
      </Flex>
    )
}

export default Tile

