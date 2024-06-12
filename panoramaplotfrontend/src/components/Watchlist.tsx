import React, { useEffect, useState } from "react";
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
  Button,
  useToast,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "../styles/Watchlist.css";
import { Movie } from "../types";
import { useAuth } from "../components/AuthContext";

interface WatchlistProps {
  searchResults: Movie[];
  searchText: string;
  favorites: Set<string>;
  setFavorites: React.Dispatch<React.SetStateAction<Set<string>>>;
  nextUrl: string;
  prevUrl: string;
}

const Watchlist: React.FC<WatchlistProps> = ({
  searchResults,
  searchText,
  favorites,
  setFavorites,
  nextUrl,
  prevUrl
}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const { colorMode } = useColorMode();
  const { isLoggedIn } = useAuth();
  const toast = useToast();

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5074/movies?page=${page}`);
        if (!response.ok) {
          const errorText = await response.text(); // Get the full error response
          throw new Error(`HTTP error! Status: ${response.status}, Response: ${errorText}`);
        }
        const data = await response.json();
        const newMovies = data.data;

        // Remove duplicates using a Map
        const uniqueMoviesMap = new Map();
        [...movies, ...newMovies].forEach((movie: Movie) => {
          uniqueMoviesMap.set(movie.Id, movie);
        });
        const uniqueMovies = Array.from(uniqueMoviesMap.values());

        setMovies(uniqueMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  useEffect(() => {
    if (searchText) {
      setMovies(searchResults);
    }
  }, [searchText, searchResults]);

  const toggleFavorite = (id: string) => {
    if (!isLoggedIn) {
      toast({
        title: "You need to be logged in to add favorites.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
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

  const loadMoreMovies = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (loading && movies.length === 0) {
    return (
      <Center height="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (movies.length === 0) {
    return (
      <Center height="100vh">
        <Text>No movies found.</Text>
      </Center>
    );
  }

  const favoriteMovies = movies.filter((movie) => favorites.has(movie.Id));
  const otherMovies = movies.filter((movie) => !favorites.has(movie.Id));

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
                key={movie.Id}
                className={`movie-card ${colorMode}`}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                boxShadow="lg"
                _hover={{ transform: "scale(1.05)" }}
                transition="transform 0.2s"
                position="relative"
              >
                <RouterLink to={`/movies/${movie.Id}`}>
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.PosterPath}`}
                    alt={movie.OriginalTitle}
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
                      {movie.OriginalTitle}
                    </Text>
                  </Box>
                </RouterLink>
                <IconButton
                  aria-label={
                    favorites.has(movie.Id)
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                  icon={
                    favorites.has(movie.Id) ? <FaHeart /> : <FaRegHeart />
                  }
                  onClick={() => toggleFavorite(movie.Id)}
                  variant="ghost"
                  backgroundColor="rgba(0, 0, 0, 0.5)"
                  color="white"
                  borderRadius="full"
                  colorScheme={favorites.has(movie.Id) ? "red" : "gray"}
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
            key={movie.Id}
            className={`movie-card ${colorMode}`}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="lg"
            _hover={{ transform: "scale(1.05)" }}
            transition="transform 0.2s"
          >
            <RouterLink to={`/movies/${movie.Id}`}>
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.PosterPath}`}
                alt={movie.OriginalTitle}
              />
              <Box p={4}>
                <Text
                  fontWeight="bold"
                  fontSize="xl"
                  className="movie-title"
                >
                  {movie.OriginalTitle}
                </Text>
              </Box>
            </RouterLink>
            <IconButton
              aria-label={
                favorites.has(movie.Id)
                  ? "Remove from favorites"
                  : "Add to favorites"
              }
              icon={favorites.has(movie.Id) ? <FaHeart /> : <FaRegHeart />}
              onClick={() => toggleFavorite(movie.Id)}
              variant="ghost"
              backgroundColor="rgba(0, 0, 0, 0.5)"
              color="white"
              borderRadius="full"
              colorScheme={favorites.has(movie.Id) ? "red" : "gray"}
              size="lg"
              position="absolute"
              top="4"
              right="4"
            />
          </Box>
        ))}
      </Grid>
      <Center mt={6}>
        <Button onClick={loadMoreMovies} colorScheme="blue">
          Load More
        </Button>
      </Center>
    </Box>
  );
};

export default Watchlist;
