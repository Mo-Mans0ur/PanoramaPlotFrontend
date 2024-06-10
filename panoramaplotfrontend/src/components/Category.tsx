import React from "react";
import { Box, Text } from "@chakra-ui/react";

interface Movie {
  title: string;
  year: string;
  Id: string;
  type: string;
  posterPath: string;
  genre: string;
}

interface CategoryProps {
  searchResults: Movie[];
  searchText: string;
  nextUrl: string;
  prevUrl: string;
  favorites: Set<string>;
  setFavorites: React.Dispatch<React.SetStateAction<Set<string>>>;
}

const Category: React.FC<CategoryProps> = ({
  searchResults,
  searchText,
  nextUrl,
  prevUrl,
  favorites,
  setFavorites,
}) => {
  return (
    <Box p={4}>
      {/* Render your category movies here */}
      {searchResults.map((movie) => (
        <Box key={movie.Id} p={4} shadow="md" borderWidth="1px">
          <Text>{movie.title}</Text>
          <Text>{movie.year}</Text>
        </Box>
      ))}
    </Box>
  );
};

export default Category;
