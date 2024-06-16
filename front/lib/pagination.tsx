import { Flex, IconButton, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import ArrowLeftIcon from "../icons/arrowLeftIcon";
import ArrowRightIcon from "../icons/arrowRightIcon";

interface PaginationControlsProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  user?: string;
  onPageChange: (pageNumber: number) => void;
}

export const PaginationControls = ({
  totalItems,
  itemsPerPage,
  user,
  onPageChange,
}: PaginationControlsProps) => {
  const router = useRouter();
  const currentPage = parseInt(router.query.page as string) || 1;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const goToPage = (pageNumber: number) => {
    router.push(`${user}?page=${pageNumber}`)
  };

  return (
    <Flex mt="8" justifyContent="center" alignItems="center">
      <IconButton
        icon={<ArrowLeftIcon />}
        onClick={() => {
          user ? goToPage(Math.max(currentPage - 1, 1)) : onPageChange(Math.max(currentPage - 1, 1))
        }}
        isDisabled={currentPage === 1}
        aria-label="Previous Page"
        mx="2"
        variant="unstyled"
        _hover={{ color: "blue.500" }}
        color={currentPage === 1 ? "gray.300" : "black"}
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
          onClick={() => { user ? goToPage(index + 1) : onPageChange(index + 1) }}
          _hover={{ bg: "gray.100", color: "black", borderRadius: "20%" }}
        >
          {index + 1}
        </Text>
      ))}
      <IconButton
        icon={<ArrowRightIcon />}
        onClick={() => {
          user ? goToPage(Math.min(currentPage + 1, totalPages)) : onPageChange(Math.min(currentPage + 1, totalPages))
        }}
        isDisabled={currentPage === totalPages}
        aria-label="Next Page"
        mx="2"
        variant="unstyled"
        _hover={{ color: "blue.500" }}
        color={currentPage === totalPages ? "gray.300" : "black"}
      />
    </Flex>
  );
};
