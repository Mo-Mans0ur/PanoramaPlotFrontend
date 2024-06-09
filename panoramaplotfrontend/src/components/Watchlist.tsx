// src/components/Watchlist.tsx
import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Text,
  Image,
  useColorMode,
  IconButton,
  Grid,
  Center,
  Spinner,
  Heading,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "../styles/Watchlist.css";

interface Movie {
  title: string;
  year: string;
  imdbID: string;
  type: string;
  posterPath: string;
  genre: string;
}

interface WatchlistProps {
  movieQuery: { searchText: string };
  favorites: Set<string>;
  setFavorites: React.Dispatch<React.SetStateAction<Set<string>>>;
}

const Watchlist: React.FC<WatchlistProps> = ({
  movieQuery,
  favorites,
  setFavorites,
}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { colorMode } = useColorMode();

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5074/movies`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const mappedMovies = data.data.map((movie: any, index: number) => ({
        title: movie.Title ?? "N/A",
        year: movie.ReleaseDate ?? "N/A",
        imdbID: movie.Id ? movie.Id.toString() : `N/A-${index}`, // Ensure unique key
        type: movie.Type ?? "N/A",
        posterPath: movie.PosterPath
          ? `http://image.tmdb.org/t/p/w500${movie.PosterPath}`
          : "/path/to/default/poster.jpg",
        genre: movie.Genre ?? "N/A",
      }));
      setMovies(mappedMovies);
      setFilteredMovies(mappedMovies); // Set initial filteredMovies
    } catch (error) {
      setError("Failed to fetch movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  useEffect(() => {
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(movieQuery.searchText.toLowerCase())
    );
    setFilteredMovies(filtered);
  }, [movieQuery.searchText, movies]);

  const toggleFavorite = (id: string) => {
    setFavorites((prevFavorites) => {
      const newFavorites = new Set(prevFavorites);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  if (loading) {
    return (
      <Center height="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center height="100vh">
        <Text>{error}</Text>
      </Center>
    );
  }

  const favoriteMovies = filteredMovies.filter((movie) =>
    favorites.has(movie.imdbID)
  );
  const otherMovies = filteredMovies.filter(
    (movie) => !favorites.has(movie.imdbID)
  );

  return (
    <Box p={4}>
      {favoriteMovies.length > 0 && (
        <Box mb={6}>
          <Heading as="h2" size="lg" mb={4}>
            Your Favorite Movies
          </Heading>
          <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
            {favoriteMovies.map((movie) => (
              <Box
                key={movie.imdbID}
                className={`movie-card ${colorMode}`}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                boxShadow="lg"
                _hover={{ transform: "scale(1.05)" }}
                transition="transform 0.2s"
              >
                <RouterLink to={`/movies/${movie.imdbID}`}>
                  <Image
                    src={movie.posterPath}
                    alt={movie.title}
                    onError={(e) =>
                      (e.currentTarget.src = "/path/to/default/poster.jpg")
                    }
                  />
                  <Box p={4}>
                    <Text
                      fontWeight="bold"
                      fontSize="xl"
                      className="movie-title"
                    >
                      {movie.title}
                    </Text>
                  </Box>
                </RouterLink>
                <IconButton
                  aria-label={
                    favorites.has(movie.imdbID)
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                  icon={
                    favorites.has(movie.imdbID) ? <FaHeart /> : <FaRegHeart />
                  }
                  onClick={() => toggleFavorite(movie.imdbID)}
                  variant="ghost"
                  colorScheme={favorites.has(movie.imdbID) ? "red" : "gray"}
                  size="lg"
                  position="absolute"
                  top="4"
                  right="4"
                />
              </Box>
            ))}
          </Grid>
        </Box>
      )}
      <Heading as="h2" size="lg" mb={4}>
        All Movies
      </Heading>
      <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
        {otherMovies.map((movie) => (
          <Box
            key={movie.imdbID}
            className={`movie-card ${colorMode}`}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="lg"
            _hover={{ transform: "scale(1.05)" }}
            transition="transform 0.2s"
          >
            <RouterLink to={`/movies/${movie.imdbID}`}>
              <Image
                src={movie.posterPath}
                alt={movie.title}
                onError={(e) =>
                  (e.currentTarget.src = "/path/to/default/poster.jpg")
                }
              />
              <Box p={4}>
                <Text fontWeight="bold" fontSize="xl" className="movie-title">
                  {movie.title}
                </Text>
              </Box>
            </RouterLink>
            <IconButton
              aria-label={
                favorites.has(movie.imdbID)
                  ? "Remove from favorites"
                  : "Add to favorites"
              }
              icon={favorites.has(movie.imdbID) ? <FaHeart /> : <FaRegHeart />}
              onClick={() => toggleFavorite(movie.imdbID)}
              variant="ghost"
              colorScheme={favorites.has(movie.imdbID) ? "red" : "gray"}
              size="lg"
              position="absolute"
              top="4"
              right="4"
            />
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default Watchlist;
