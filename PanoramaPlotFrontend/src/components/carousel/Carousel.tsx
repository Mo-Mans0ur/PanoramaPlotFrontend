import React from "react";
import { useRef } from "react";
import {
  Box,
  IconButton,
  HStack,
  useBreakpointValue,
  Icon,
} from "@chakra-ui/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface Props {
  children: React.ReactNode;
}

const Carousel = ({ children }: Props) => {
  const scrollAmount = useBreakpointValue({ base: 1, md: 3 }) ?? 0;
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const carousel = carouselRef.current as HTMLDivElement;
      carousel.scrollLeft +=
        direction === "left" ? -scrollAmount : scrollAmount;
    }
  };

  return (
    <Box position="relative" overflow="hidden">
      <IconButton
        aria-label="Scroll left"
        icon={<Icon as={FiChevronLeft} />}
        position="absolute"
        left={0}
        top="50%"
        transform="translateY(-50%)"
        zIndex={2}
        onClick={() => scroll("left")}
      />
      <HStack
        ref={carouselRef}
        spacing={20}
        overflowX="auto"
        whiteSpace="nowrap"
        p="20px"
        scrollBehavior="smooth"
      >
        {children}
      </HStack>
      <IconButton
        aria-label="Scroll right"
        icon={<Icon as={FiChevronRight} />}
        position="absolute"
        right={0}
        top="50%"
        transform="translateY(-50%)"
        zIndex={2}
        onClick={() => scroll("right")}
      />
    </Box>
  );
};

export default Carousel;
