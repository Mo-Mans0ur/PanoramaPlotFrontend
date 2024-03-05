import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import React, { useState, useEffect } from 'react';

const LikeButton = ({ movieId, favorites, setFavorites }) => {
  const [liked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(favorites.has(movieId)); // Check if movieId is in favorites on mount and when favorites changes
  }, [favorites, movieId]);

  const toggle = () => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(movieId)) {
      newFavorites.delete(movieId);
    } else {
      newFavorites.add(movieId);
    }
    setFavorites(newFavorites);
  };

  return (
    liked ? 
      <IoIosHeart color="#ff6b81" size={20} onClick={toggle} /> :
      <IoIosHeartEmpty size={20} onClick={toggle} />
  );
};

export default LikeButton;
