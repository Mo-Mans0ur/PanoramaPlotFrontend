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
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [movieQuery, setMovieQuery] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set<string>());
  const [nextUrl, setNextUrl] = useState<string>('');
  const [prevUrl, setPrevUrl] = useState<string>('');

  const handleSearch = (searchText: string) => {
    setMovieQuery(searchText);
  };

  const handleSearchResults = (data: any[]) => {
    setSearchResults(data);
  };

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Navbar onSearch={handleSearch} onSearchResults={handleSearchResults} />
        <Routes>
          <Route
            path="/"
            element={
              <Watchlist
                searchResults={searchResults}
                searchText={movieQuery}
                nextUrl={nextUrl}
                prevUrl={prevUrl}
                favorites={favorites}
                setFavorites={setFavorites}
              />
            }
          />
          <Route
            path="/category"
            element={
              <Category
                searchResults={searchResults}
                searchText={movieQuery}
                nextUrl={nextUrl}
                prevUrl={prevUrl}
                favorites={favorites}
                setFavorites={setFavorites}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                searchResults={searchResults}
                searchText={movieQuery}
                nextUrl={nextUrl}
                prevUrl={prevUrl}
                favorites={favorites}
                setFavorites={setFavorites}
              />
            }
          />
          <Route
            path="/movies/:id"
            element={
              <MovieDetails
                searchResults={searchResults}
                searchText={movieQuery}
                nextUrl={nextUrl}
                prevUrl={prevUrl}
                favorites={favorites}
                setFavorites={setFavorites}
              />
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
