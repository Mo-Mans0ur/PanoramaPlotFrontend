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
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "../styles/Watchlist.css";

interface Movie {
  OriginalTitle: string;
  year: string;
  Id: string;
  type: string;
  posterPath: string;
  genre: string;
}

interface WatchlistProps {
  searchResults: Movie[];
  searchText: string;
  nextUrl: string;
  prevUrl: string;
  favorites: Set<string>;
  setFavorites: React.Dispatch<React.SetStateAction<Set<string>>>;
}

const Watchlist: React.FC<WatchlistProps> = ({
  searchResults,
  searchText,
  nextUrl,
  prevUrl,
  favorites,
  setFavorites,
}) => {
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const { colorMode } = useColorMode();

  useEffect(() => {
    console.log("Search Results:", searchResults);
    console.log("Search Text:", searchText);

    if (searchResults && searchResults.length > 0) {
      const filtered = searchResults.filter((movie) => {
        console.log("Movie Object:", movie);
        // Ensure searchText is treated as a string
        return movie.OriginalTitle?.toLowerCase().includes(
          searchText.toLowerCase()
        );
      });
      console.log("Filtered Movies (new):", filtered);
      setFilteredMovies(filtered);
      setLoading(false);
    } else {
      console.log("No search results found.");
      setLoading(false);
    }
  }, [searchText, searchResults]);

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

  if (filteredMovies.length === 0) {
    return (
      <Center height="100vh">
        <Text>No movies found.</Text>
      </Center>
    );
  }

  const favoriteMovies = filteredMovies.filter((movie) =>
    favorites.has(movie.Id)
  );
  const otherMovies = filteredMovies.filter(
    (movie) => !favorites.has(movie.Id)
  );

  return (
    <Box p={4}>
      {favoriteMovies.length > 0 && (
        <Box mb={6}>
          <Heading as="h2" size="lg" mb={4}>
            Your Favorite Movies
          </Heading>
          <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
            {favoriteMovies.map((movie) => {
              if (!movie.Id) {
                console.error("Movie object missing Id:", movie);
                return null;
              }
              console.log("Favorite Movie Object:", movie);
              return (
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
                      src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`} // Ensure correct poster path
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
                    colorScheme={favorites.has(movie.Id) ? "red" : "gray"}
                    size="lg"
                    position="absolute"
                    top="4"
                    right="4"
                  />
                </Box>
              );
            })}
          </Grid>
        </Box>
      )}
      <Heading as="h2" size="lg" mb={4}>
        All Movies
      </Heading>
      <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
        {otherMovies.map((movie) => {
          if (!movie.Id) {
            console.error("Movie object missing Id:", movie);
            return null;
          }
          console.log("Other Movie Object:", movie);
          return (
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
                  src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`} // Ensure correct poster path
                  alt={movie.OriginalTitle}
                  onError={(e) =>
                    (e.currentTarget.src = "/path/to/default/poster.jpg")
                  }
                />
                <Box p={4}>
                  <Text fontWeight="bold" fontSize="xl" className="movie-title">
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
                colorScheme={favorites.has(movie.Id) ? "red" : "gray"}
                size="lg"
                position="absolute"
                top="4"
                right="4"
              />
            </Box>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Watchlist;
