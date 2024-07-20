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
  currentPage,
  totalItems,
  itemsPerPage,
  user,
  onPageChange,
}: PaginationControlsProps) => {
  const router = useRouter();
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const goToPage = (pageNumber: number) => {
    if (user) {
      router.push(`${user}?page=${pageNumber}`);
    } else {
      onPageChange(pageNumber);
    }
  };

  return (
    <Flex my="8" justifyContent="center" alignItems="center" className="lg:my-4 lg:h-16" >
      <IconButton
        icon={<ArrowLeftIcon />}
        onClick={() => goToPage(Math.max(currentPage - 1, 1))}
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
          onClick={() => goToPage(index + 1)}
          _hover={{ bg: "gray.100", color: "black", borderRadius: "20%" }}
        >
          {index + 1}
        </Text>
      ))}
      <IconButton
        icon={<ArrowRightIcon />}
        onClick={() => goToPage(Math.min(currentPage + 1, totalPages))}
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
