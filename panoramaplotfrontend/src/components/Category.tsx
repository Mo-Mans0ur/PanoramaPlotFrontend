// Category.tsx
import React from 'react';
import '../styles/Category.css';
import { MovieQuery } from '../types'; // Import the type


interface CategoryProps {
    movieQuery: MovieQuery;
  }

const Category: React.FC<CategoryProps> = ({ movieQuery }) => {
    return <p>Search Text: {movieQuery.searchText}</p>;

};

export default Category;
