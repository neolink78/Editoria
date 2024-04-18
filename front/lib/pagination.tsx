import { Flex, IconButton, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import ArrowLeftIcon from "../icons/arrowLeftIcon";
import ArrowRightIcon from "../icons/arrowRightIcon";

interface PaginationControlsProps {
    setCurrentPage: Dispatch<SetStateAction<number>>;
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
}
export const PaginationControls = ({
    setCurrentPage,
    currentPage,
    totalItems,
    itemsPerPage
}: PaginationControlsProps) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <Flex mt="8" justifyContent="center" alignItems="center">
            <IconButton
                icon={<ArrowLeftIcon />}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                isDisabled={currentPage === 1}
                aria-label="Page précédente"
                mx="2"
                variant="unstyled"
                _hover={{ color: 'blue.500' }}
                color={currentPage === 1 ? 'gray.300' : 'black'}
            />
            {Array.from({ length: totalPages }, (_, index) => (
                <Text
                    key={index}
                    mx="1"
                    px="2"
                    py="1"
                    cursor="pointer"
                    fontWeight={currentPage === index + 1 ? "bold" : "lighter"}
                    color={currentPage === index + 1 ? "white" : "gray.500"}

                    onClick={() => paginate(index + 1)}
                    _hover={{ bg: 'gray.100', color: 'black', borderRadius: '20%' }}
                >
                    {index + 1}
                </Text>
            ))}

            <IconButton
                icon={<ArrowRightIcon />}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                isDisabled={currentPage === totalPages}
                aria-label="Page suivante"
                mx="2"
                variant="unstyled" 
                _hover={{ color: 'blue.500' }} 
                color={currentPage === 1 ? 'black' : 'gray.300'}
            />
        </Flex>
    );
}