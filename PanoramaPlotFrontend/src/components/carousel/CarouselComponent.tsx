import React, { useState, useEffect } from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import Carousel from "./Carousel";

// Define the TypeScript interface for movies
interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

const CarouselComponent = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    // Example search query for "batman" movies
    fetch("http://www.omdbapi.com/?s=batman&apikey=a5543599")
      .then((response) => response.json())
      .then((data) => {
        if (data.Search) {
          setMovies(data.Search); // Make sure to use the correct property from the API
        }
      })
      .catch((error: unknown) => { // Correct type for caught errors is unknown
        console.error("Error fetching:", error);
      });
  }, []);

  return (
    <Carousel>
        {movies.map((movie) => (
        <Box
          key={movie.imdbID}
          minW="200px"
          boxShadow="md"
          borderRadius="lg"
          overflow="hidden"
        >
          <Image src={movie.Poster} alt={movie.Title} />
          <Text color="white" p={2}>
            {movie.Title}
          </Text>
        </Box>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
