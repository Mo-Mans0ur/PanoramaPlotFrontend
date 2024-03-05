import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Text,
  useColorModeValue,
  Flex,
  Image,
  VStack,
  Heading,
} from "@chakra-ui/react";

interface MovieDetailsProps {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Genre: string;
  // Add other relevant fields from the API response
}

interface Props {
  favorites: Set<string>;
  setFavorites: React.Dispatch<React.SetStateAction<Set<string>>>;
}

const MovieDetails = ({ favorites, setFavorites }: Props) => {
  let { id } = useParams<{ id: string }>();
  const [movieDetails, setMovieDetails] = useState<MovieDetailsProps | null>(null);
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  useEffect(() => {
    fetch(`http://www.omdbapi.com/?i=${id}&apikey=a5543599`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the response has the correct structure
        setMovieDetails(data); // Cast the response to MovieDetails
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
      });
  }, [id]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <Flex
      align="center"
      justify="center"
      direction={{ base: "column", md: "row" }}
      wrap="wrap"
      bg={bgColor}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="lg"
      overflow="auto"
      m="4"
      p="4"
    >
      <Box flexShrink={0}>
        <Image
          src={movieDetails.Poster}
          alt={movieDetails.Title}
          boxSize={{ base: "100%", md: "200px" }}
          width="100%" // Image will take up 100% of the Box width
          objectFit="contain"
        />
      </Box>
      <VStack align="start" spacing="4" ml={{ base: 0, md: "4" }} p="4">
        <Heading size="lg">{movieDetails.Title}</Heading>
        <Text fontSize="lg">{movieDetails.Genre}</Text>
        <Text fontSize="lg">{movieDetails.Year}</Text>
        <Text fontSize="lg">{movieDetails.Type}</Text>
      </VStack>
    </Flex>
  );
};

export default MovieDetails;