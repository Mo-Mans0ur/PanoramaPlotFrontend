import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Text, Image, Spinner, Center, useColorMode, IconButton } from '@chakra-ui/react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

interface MovieDetailsProps {
  movieQuery: { searchText: string };
  favorites: Set<string>;
  setFavorites: React.Dispatch<React.SetStateAction<Set<string>>>;
}

interface MovieDetail {
  Adult: boolean;
  BackdropPath: string;
  GenreIds: number[] | null;
  Id: number;
  OriginalLanguage: string;
  OriginalTitle: string;
  Overview: string;
  Popularity: number;
  PosterPath: string;
  ReleaseDate: string;
  Title: string;
  VoteAverage: number;
  VoteCount: number;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movieQuery, favorites, setFavorites }) => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { colorMode } = useColorMode();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:5074/movie/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMovie(data.data);
      } catch (error) {
        setError('Failed to fetch movie details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleFavorite = () => {
    if (!id) return;
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

  if (!movie) {
    return (
      <Center height="100vh">
        <Text>Movie not found</Text>
      </Center>
    );
  }

  return (
    <Box p={4}>
      <Box
        maxW="800px"
        mx="auto"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="lg"
        className={`movie-details ${colorMode}`}
      >
        <Image src={`http://image.tmdb.org/t/p/w500${movie.PosterPath}`} alt={movie.Title} objectFit="cover" />
        <Box p={6}>
          <Text fontWeight="bold" fontSize="2xl" mb={2}>{movie.Title}</Text>
          <Text fontSize="md" color="gray.500" mb={4}>{new Date(movie.ReleaseDate).toDateString()}</Text>
          <Text mt={4}><strong>Genre:</strong> {movie.GenreIds ? movie.GenreIds.join(', ') : 'N/A'}</Text>
          <Text mt={2}><strong>Language:</strong> {movie.OriginalLanguage}</Text>
          <Text mt={2}><strong>Overview:</strong> {movie.Overview}</Text>
          <Text mt={2}><strong>Popularity:</strong> {movie.Popularity}</Text>
          <Text mt={2}><strong>Vote Average:</strong> {movie.VoteAverage}</Text>
          <Text mt={2}><strong>Vote Count:</strong> {movie.VoteCount}</Text>
          <Box mt={4}>
            <IconButton
              aria-label={favorites.has(id ?? '') ? "Remove from favorites" : "Add to favorites"}
              icon={favorites.has(id ?? '') ? <FaHeart /> : <FaRegHeart />}
              onClick={handleFavorite}
              variant="ghost"
              colorScheme={favorites.has(id ?? '') ? 'red' : 'gray'}
              size="lg"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MovieDetails;
