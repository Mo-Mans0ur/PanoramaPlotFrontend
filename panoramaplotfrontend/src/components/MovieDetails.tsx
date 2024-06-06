import React from 'react';
import { useParams } from 'react-router-dom';

interface MovieDetailsProps {
  favorites: Set<string>;
  setFavorites: React.Dispatch<React.SetStateAction<Set<string>>>;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ favorites, setFavorites }) => {
  const { id } = useParams<{ id: string }>();
  
  if (!id) {
    // Handle the case when id is not present in the URL
    return <div>Movie not found</div>;
  }

  const handleFavorite = () => {
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
    <div>
      <h1>Movie Details for {id}</h1>
      <button onClick={handleFavorite}>
        {favorites.has(id) ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
};

export default MovieDetails;
