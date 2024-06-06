import React, { useState } from 'react';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Watchlist from './components/Watchlist';
import Category from './components/Category';
import MovieDetails from './components/MovieDetails';
import theme from './theme';
import './styles/App.css';
import { MovieQuery } from './types'; // Import the type

const App: React.FC = () => {
  const [movieQuery, setMovieQuery] = useState<MovieQuery>({ searchText: '' });
  const [favorites, setFavorites] = useState<Set<string>>(new Set<string>());

  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Router>
        <Navbar onSearch={(searchText) => setMovieQuery({ searchText })} />
        <Routes>
          <Route path="/" element={<Watchlist movieQuery={movieQuery} />} />
          <Route path="/category" element={<Category movieQuery={movieQuery} />} />
          <Route path="/movie/:id" element={<MovieDetails favorites={favorites} setFavorites={setFavorites} />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
