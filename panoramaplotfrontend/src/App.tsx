// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Watchlist from './components/Watchlist';
import MovieDetails from './components/MovieDetails';
import Category from './components/Category';
import Favorites from './components/Favorites';
import Login from './components/Login';
import theme from './theme';
import './styles/App.css';

const App: React.FC = () => {
  const [movieQuery, setMovieQuery] = useState({ searchText: '' });
  const [favorites, setFavorites] = useState<Set<string>>(new Set<string>());

  const handleSearch = (searchText: string) => {
    setMovieQuery({ searchText });
  };

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Navbar onSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<Watchlist movieQuery={movieQuery} favorites={favorites} setFavorites={setFavorites} />} />
          <Route path="/category" element={<Category movieQuery={movieQuery} favorites={favorites} setFavorites={setFavorites} />} />
          <Route path="/movies/:id" element={<MovieDetails movieQuery={movieQuery} favorites={favorites} setFavorites={setFavorites} />} />
          <Route path="/favorites" element={<Favorites favorites={favorites} setFavorites={setFavorites} />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
