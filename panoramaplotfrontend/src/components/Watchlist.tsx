import React, { useEffect, useState, useCallback } from 'react';
import { Box, Text, Image, useColorMode, IconButton, Grid, Center, Spinner } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import '../styles/Watchlist.css';
import { MovieQuery } from '../types';

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  PosterPath: string;
  Genre: string;
}

interface WatchlistProps {
  movieQuery: MovieQuery;
  favorites: Set<string>;
  setFavorites: React.Dispatch<React.SetStateAction<Set<string>>>;
}

const Watchlist: React.FC<WatchlistProps> = ({ movieQuery, favorites, setFavorites }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { colorMode } = useColorMode();

  const fetchMovies = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5074/movies');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const mappedMovies = data.data.map((movie: any) => ({
        ...movie,
        imdbID: movie.Id.toString(),
      }));
      setMovies(mappedMovies);
    } catch (error) {
      setError('Failed to fetch movies. Please try again later.');
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const toggleFavorite = (id: string) => {
    setFavorites(prevFavorites => {
      const newFavorites = new Set(prevFavorites);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  return (
    <Box p={4}>
      {error ? (
        <Center height="100vh">
          <Text>{error}</Text>
        </Center>
      ) : (
        <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
          {movies.map((movie) => (
            <Box key={movie.imdbID} className={`movie-card ${colorMode}`} borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="lg" _hover={{ transform: 'scale(1.05)' }} transition="transform 0.2s">
              <RouterLink to={`/movies/${movie.imdbID}`}>
                <Image src={`http://image.tmdb.org/t/p/w500${movie.PosterPath}`} alt={movie.Title} />
                <Box p={4}>
                  <Text fontWeight="bold" fontSize="xl" className="movie-title">{movie.Title}</Text>
                </Box>
              </RouterLink>
              <IconButton
                aria-label={favorites.has(movie.imdbID) ? "Remove from favorites" : "Add to favorites"}
                icon={favorites.has(movie.imdbID) ? <FaHeart /> : <FaRegHeart />}
                onClick={() => toggleFavorite(movie.imdbID)}
                variant="ghost"
                colorScheme={favorites.has(movie.imdbID) ? 'red' : 'gray'}
                size="lg"
                position="absolute"
                top="4"
                right="4"
              />
            </Box>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Watchlist;
