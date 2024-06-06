import React from 'react';
import { MovieQuery } from '../types';

interface CategoryProps {
  movieQuery: MovieQuery;
  favorites: Set<string>;
  setFavorites: React.Dispatch<React.SetStateAction<Set<string>>>;
}

const Category: React.FC<CategoryProps> = ({ movieQuery, favorites, setFavorites }) => {
  return <p>Search Text: {movieQuery.searchText}</p>;
};

export default Category;
