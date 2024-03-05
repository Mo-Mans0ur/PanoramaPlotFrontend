// Importer nødvendige komponenter og hooks fra biblioteker
import { Box, HStack, Text, Image, useColorMode, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useState, useEffect } from "react";
import Carousel from "./carousel/Carousel";

// Definerer en interface til at beskrive strukturen af et filmobjekt
interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Genre: string;
}

// Definerer Watchlist komponenten
const Watchlist = () => {
  const [movies, setMovies] = useState<Movie[]>([]); // Opretter en state variabel for film
  const { colorMode } = useColorMode(); // Bruger colorMode hook
  const colorSwitch = colorMode === "dark" ? "white" : "black"; // Skifter farve baseret på colorMode

  // Bruger useEffect hook til at hente filmdata når komponenten er monteret
  useEffect(() => {
    fetch("http://www.omdbapi.com/?i=tt3896198&apikey=a5543599")
      .then((response) => response.json())
      .then((data) => {
        // Tjekker om svaret er succesfuldt og har en titel egenskab
        if (data && data.Title) {
          setMovies([data]); // Indpakker data i et array
        } else {
          throw new Error("Invalid movie data");
        }
      })
      .catch((error: unknown) => console.error("Error fetching:", error));
  }, []);

  // Returnerer JSX, der repræsenterer UI for Watchlist komponenten
  return (
    <Box padding="30px">
      <Text fontSize="2xl" color={colorSwitch}>
        Watchlist
      </Text>
      <hr />
      <Carousel>
        {movies.map((movie) => (
          <Link as={RouterLink} to={`/movie/${movie.imdbID}`}>
            <Box
              key={movie.imdbID}
              width="200px"
              boxShadow="md"
              borderRadius="lg"
              overflow="hidden"
              padding="10px"
            >
              <Box />
              <Image src={movie.Poster} alt={movie.Title} fit="cover" />
              <Text color={colorSwitch} whiteSpace="pre-line">
                {movie.Title}
              </Text>
            </Box>
          </Link>
        ))}
      </Carousel>
    </Box>
  );
};

// Eksporterer Watchlist komponenten som standard eksport
export default Watchlist;