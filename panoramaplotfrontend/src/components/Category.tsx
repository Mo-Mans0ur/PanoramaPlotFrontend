import React from "react";
import { Box, Text } from "@chakra-ui/react";

interface Movie {
  title: string;
  year: string;
  Id: string;
  type: string;
  posterPath: string;
  genre: string;
}

interface CategoryProps {
  
  nextUrl: string;
  prevUrl: string;
  favorites: Set<string>;
  setFavorites: React.Dispatch<React.SetStateAction<Set<string>>>;
}

const Category: React.FC<CategoryProps> = ({
  
  nextUrl,
  prevUrl,
  favorites,
  setFavorites,
}) => {
  return (
    <Box p={4}>
      {/* Render your category movies here */}
      
        
      
    </Box>
  );
};

export default Category;
