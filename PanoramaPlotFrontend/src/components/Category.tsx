import React from "react";
import { Box, Text, useColorMode, Wrap, WrapItem } from "@chakra-ui/react";
import { useState } from "react";

interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
    Genre: string;
  }

const Category = () => {
  const { colorMode } = useColorMode(); // Use the color mode hook
  const [movies, setMovies] = useState<Movie[]>([]);

  return (
    <Box padding="20px" mt="10">
      <Text fontSize="2xl" mb="4" color={colorMode === "dark" ? "white" : "black"}>
        Genres
      </Text>
      <Wrap spacing="20px">
        {movies.map((movie) => (
          <WrapItem
            key={movie.imdbID}
            bg={colorMode === "dark" ? "gray.600" : "gray.200"}
            borderRadius="lg"
            padding="20px"
          >
            <Text color={colorMode === "dark" ? "white" : "black"} isTruncated>
              {movie.Genre}
            </Text>
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
};

export default Category;
