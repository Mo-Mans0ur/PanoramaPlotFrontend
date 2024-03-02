// Importer nødvendige komponenter og hooks fra biblioteker
import { Box, Text, useColorMode, Wrap, WrapItem } from "@chakra-ui/react";
import { useState } from "react";
import { MovieQuery } from "../App";

// Definerer en interface til at beskrive strukturen af et filmobjekt
interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Genre: string;
}

// Definerer en interface til at beskrive strukturen af props for Category komponenten
interface Props {
  movieQuery?: MovieQuery;
}

// Definerer Category komponenten
const Category = ({ movieQuery }: Props) => {
  const { colorMode } = useColorMode(); // Bruger colorMode hook
  const [movies, setMovies] = useState<Movie[]>([]); // Opretter en state variabel for film

  // Returnerer JSX, der repræsenterer UI for Category komponenten
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

// Eksporterer Category komponenten som standard eksport
export default Category;