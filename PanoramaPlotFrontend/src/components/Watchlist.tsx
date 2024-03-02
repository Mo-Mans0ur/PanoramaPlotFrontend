import { Box, HStack, Text, Image } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
  

const Watchlist = () => {

const [movies, setMovies] = useState([]);

useEffect(() => {
    fetch("http://api.example.com/watchlist")
        .then((response) => response.json())
        .then((data) => setMovies(data))
        .catch((error: any) => console.error("Error fetching:", error));
}, []);



  return (
    <Box overflow="auto" whiteSpace="nowrap" padding="20px" bg="gray.800">
        <Text fontSize="2xl" color="white">
            Watchlist Watchlist
        </Text>
        <HStack spacing="20px">
            {movies.map((movie: any, index: number) => (
                <Box key={index} bg="gray.700" borderRadius="lg" padding="20px">
                    <Image src={movie.poster} alt={movie.title} /> 
                    <Text color="white" isTruncated>
                        {movie.title}
                    </Text>
                </Box>
            ))}
        </HStack>
    </Box>
  );
};

export default Watchlist;
