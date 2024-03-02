import React, { useState, useEffect } from 'react'
import { Box, HStack, Text, Image } from '@chakra-ui/react'

const Category = () => {
  const [genres, setGenres] = useState([]); // Create a state variable to store the genres
    
  useEffect(() => {
    fetch('http://api.example.com/genres') // Fetch the genres from the API
      .then((response) => response.json())
      .then((data) => setGenres(data))
      .catch((error: any) => console.error('Error fetching:', error))
  }, []);
  
  return (
    <Box overflow="auto" whiteSpace="nowrap" padding="20px" bg="gray.800" mt="10">
        <Text fontSize="2xl" color="white">
            Genres
        </Text>
        <HStack spacing="20px">
            {genres.map((genre: any, index: number) => (
            <Box key={index} bg="gray.700" borderRadius="lg" padding="20px">
                <Image src={genre.poster} alt={genre.title} />
                <Text color="white" isTruncated>
                {genre.title}
                </Text>
            </Box>
            ))}
        </HStack>
    </Box>
  )
}

export default Category