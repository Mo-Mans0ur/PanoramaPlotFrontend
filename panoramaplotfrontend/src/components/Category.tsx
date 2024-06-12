import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import { Movie } from "../types";

interface CategoryProps {
  nextUrl: string;
  prevUrl: string;
  favorites: Set<string>;
  setFavorites: React.Dispatch<React.SetStateAction<Set<string>>>;
}

const Category: React.FC<CategoryProps> = ({ nextUrl, prevUrl, favorites, setFavorites }) => {
  return (
    <Box>
      <Heading as="h2">Category Component</Heading>
      {/* Add your category component logic here */}
    </Box>
  );
};

export default Category;
