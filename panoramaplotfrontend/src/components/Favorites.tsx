import React from "react";
import {
  Box,
  Heading,
  Text,
  Image,
  Grid,
  IconButton,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Movie } from "../types";

interface FavoritesProps {
  searchResults: Movie[];
  favorites: Set<string>;
  setFavorites: React.Dispatch<React.SetStateAction<Set<string>>>;
}

const Favorites: React.FC<FavoritesProps> = ({
  searchResults,
  favorites,
  setFavorites,
}) => {
  const toggleFavorite = async (movie: Movie) => {
    const updatedFavorites = new Set(favorites);

    if (updatedFavorites.has(movie.Id)) {
      updatedFavorites.delete(movie.Id);
    } else {
      updatedFavorites.add(movie.Id);
    }

    setFavorites(updatedFavorites);

    try {
      const response = await fetch("http://localhost:5074/movies/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  const favoriteMovies = searchResults.filter((movie) =>
    favorites.has(movie.Id)
  );

  if (favoriteMovies.length === 0) {
    return (
      <Box>
        <Heading as="h2" size="lg" color="gray.500" textAlign="center">
          No favorite movies yet!
        </Heading>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Heading as={"h2"} size="lg" mb={4}>
        Your favorite movies¨
      </Heading>
      <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={4}>
        {favoriteMovies.map((movie) => (
          <Box
            key={movie.Id}
            className="movie-card"
            boxShadow="md"
            borderRadius="md"
            overflow="hidden"
            bg="white"
            borderWidth="1px"
            _hover={{ transform: "scale(1.05)" }}
            transition="transform 0.2s"
          >
            <RouterLink to={`https://localhost:5074/movies/${movie.Id}`}>
              <Image
                src={`https://image.tmdb.org/t/p/w500/${movie.PosterPath}`}
                alt={movie.OriginalTitle}
              />
              <Box p={4}>
                <Text fontWeight="bold" fontSize="x1" className="movie-title">
                  {movie.OriginalTitle}
                </Text>
                <Text fontSize="sm">{movie.ReleaseDate}</Text>
                <Text fontSize="sm">Genre: {movie.genre}</Text>
              </Box>
            </RouterLink>
            <IconButton
              aria-label={
                favorites.has(movie.Id)
                  ? "Remove from favorites"
                  : "Add to favorites"
              }
              icon={favorites.has(movie.Id) ? <FaHeart /> : <FaRegHeart />}
              onClick={() => toggleFavorite(movie)}
            />
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default Favorites;
