import React from "react";
import { Box, Text, Image } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import "../styles/Favorites.css";

interface Movie {
  title: string;
  year: string;
  Id: string;
  type: string;
  posterPath: string;
  genre: string;
}

interface FavoritesProps {
  searchResults: Movie[];
  searchText: string;
  nextUrl: string;
  prevUrl: string;
  favorites: Set<string>;
  setFavorites: React.Dispatch<React.SetStateAction<Set<string>>>;
}

const Favorites: React.FC<FavoritesProps> = ({
  searchResults,
  searchText,
  nextUrl,
  prevUrl,
  favorites,
  setFavorites,
}) => {
  return (
    <Box p={4}>
      {searchResults.map((movie) => (
        <Box key={movie.Id} p={4} shadow="md" borderWidth="1px">
          <Text>{movie.title}</Text>
          <Text>{movie.year}</Text>
          <Image src={movie.posterPath} alt={movie.title} />
        </Box>
      ))}
    </Box>
  );
};

export default Favorites;
