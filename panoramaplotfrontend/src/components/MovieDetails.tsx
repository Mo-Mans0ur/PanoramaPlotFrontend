import React, { useEffect, useState } from "react";
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
  nextUrl: string;
  prevUrl: string;
  favorites: Set<string>;
  setFavorites: React.Dispatch<React.SetStateAction<Set<string>>>;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({
  nextUrl,
  prevUrl,
  favorites,
  setFavorites,
}) => {
  const { id } = useParams<{ id: string }>();
  const { colorMode } = useColorMode();
  const [movie, setMovie] = useState<Movie | null>(null);

 

  const toggleFavorite = async () => {
    try {
      const response = await fetch('/movies/favorite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ movie })
      });
      const data = await response.json();
      setFavorites(new Set(data.favorites));
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  if (!movie) {
    return <Text>Loading...</Text>;
  }

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
