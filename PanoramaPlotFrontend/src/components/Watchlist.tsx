import { Box, HStack, Text, Image, useColorMode, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Carousel from "./carousel/Carousel";

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Genre: string;
}

const Watchlist = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const { colorMode } = useColorMode();
  const colorSwitch = colorMode === "dark" ? "white" : "black";

  useEffect(() => {
    fetch("http://www.omdbapi.com/?i=tt3896198&apikey=a5543599")
      .then((response) => response.json())
      .then((data) => {
        // Check if the response is successful and has a title property
        if (data && data.Title) {
          setMovies([data]); // Wrap the data in an array
        } else {
          throw new Error("Invalid movie data");
        }
      })
      .catch((error: unknown) => console.error("Error fetching:", error));
  }, []);

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

export default Watchlist;
