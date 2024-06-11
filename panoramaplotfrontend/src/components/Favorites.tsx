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
  
  nextUrl: string;
  prevUrl: string;
  favorites: Set<string>;
  setFavorites: React.Dispatch<React.SetStateAction<Set<string>>>;
}

const Favorites: React.FC<FavoritesProps> = ({
  
  nextUrl,
  prevUrl,
  favorites,
  setFavorites,
}) => {
  return (
    <Box p={4}>
      
    </Box>
  );
};

export default Favorites;
