import React, { useEffect, useState } from 'react';
import { Box, Text, Image, useColorMode } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import Carousel from './Carousel';
import '../styles/Watchlist.css';
import { MovieQuery } from '../types';

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Genre: string;
}

interface WatchlistProps {
  movieQuery: MovieQuery;
}

const Watchlist: React.FC<WatchlistProps> = ({ movieQuery }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { colorMode } = useColorMode();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch(`http://localhost:5075/movies/1`); // Update this URL to match your backend
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMovies(data.movies);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setError('Failed to fetch movies. Please try again later.');
    }
  };
  

  return (
    <Box>
      {error ? (
        <Text>{error}</Text>
      ) : (
        <Carousel>
          {movies.map((movie) => (
            <Box key={movie.imdbID} className={`movie-card ${colorMode}`}>
              <RouterLink to={`/movie/${movie.imdbID}`}>
                <Image src={movie.Poster} alt={movie.Title} />
                <Text>{movie.Title}</Text>
              </RouterLink>
            </Box>
          ))}
        </Carousel>
      )}
    </Box>
  );
};

export default Watchlist;
