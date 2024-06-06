import React from 'react';
import { IconButton } from '@chakra-ui/react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import '../styles/LikeButton.css';

interface LikeButtonProps {
  movieId: string;
  favorites: Set<string>;
  setFavorites: React.Dispatch<React.SetStateAction<Set<string>>>;
}

const LikeButton: React.FC<LikeButtonProps> = ({ movieId, favorites, setFavorites }) => {
  const isFavorite = favorites.has(movieId);

  const handleToggleFavorite = () => {
    setFavorites((prevFavorites) => {
      const newFavorites = new Set(prevFavorites);
      if (newFavorites.has(movieId)) {
        newFavorites.delete(movieId);
      } else {
        newFavorites.add(movieId);
      }
      return newFavorites;
    });
  };

  return (
    <IconButton
      aria-label="Toggle Favorite"
      icon={isFavorite ? <FaHeart /> : <FaRegHeart />}
      onClick={handleToggleFavorite}
      colorScheme={isFavorite ? 'red' : 'gray'}
    />
  );
};

export default LikeButton;
