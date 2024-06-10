import React from "react";
import { Box, Text, Image, useColorMode } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import "../styles/MovieDetails.css";

interface Movie {
  title: string;
  year: string;
  Id: string;
  type: string;
  posterPath: string;
  genre: string;
}

interface MovieDetailsProps {
  searchResults: Movie[];
  searchText: string;
  nextUrl: string;
  prevUrl: string;
  favorites: Set<string>;
  setFavorites: React.Dispatch<React.SetStateAction<Set<string>>>;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({
  searchResults,
  searchText,
  nextUrl,
  prevUrl,
  favorites,
  setFavorites,
}) => {
  const { id } = useParams<{ id: string }>();
  const { colorMode } = useColorMode();

  const movie = searchResults.find((movie) => movie.Id === id);

  if (!movie) {
    return (
      <Box p={4}>
        <Text>Movie not found</Text>
      </Box>
    );
  }

  const toggleFavorite = () => {
    setFavorites((prevFavorites) => {
      const newFavorites = new Set(prevFavorites);
      if (newFavorites.has(movie.Id)) {
        newFavorites.delete(movie.Id);
      } else {
        newFavorites.add(movie.Id);
      }
      return newFavorites;
    });
  };

  return (
    <Box p={4}>
      <Image
        src={movie.posterPath}
        alt={movie.title}
        onError={(e) => (e.currentTarget.src = "/path/to/default/poster.jpg")}
      />
      <Box p={4}>
        <Text fontWeight="bold" fontSize="xl" className="movie-title">
          {movie.title}
        </Text>
        <Text>Year: {movie.year}</Text>
        <Text>Genre: {movie.genre}</Text>
        <Text>Type: {movie.type}</Text>
        <button onClick={toggleFavorite}>
          {favorites.has(movie.Id) ? "Remove from favorites" : "Add to favorites"}
        </button>
      </Box>
    </Box>
  );
};

export default MovieDetails;
