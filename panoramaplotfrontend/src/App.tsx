import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, useColorMode} from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Watchlist from './components/Watchlist';
import MovieDetails from './components/MovieDetails';
import Category from './components/Category';
import Favorites from './components/Favorites';
import Login from './components/Login';
import theme from './theme';
import './styles/App.css';
import { AuthProvider } from './components/AuthContext'; // Ensure this path is correct
import { Movie } from './types';


const App: React.FC = () => {
  const [movieQuery, setMovieQuery] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set<string>());
  const [nextUrl, setNextUrl] = useState<string>('');
  const [prevUrl, setPrevUrl] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const { colorMode } = useColorMode();

  useEffect(() => {
    document.body.classList.toggle('light-mode', colorMode === 'light');
    document.body.classList.toggle('dark-mode', colorMode === 'dark');
  }, [colorMode]);

  const handleSearch = async (searchText: string) => {
    setMovieQuery(searchText);

    try {
      const response = await fetch(`http://localhost:5074/movies/search/${searchText}`);
      const data = await response.json();
      setSearchResults(data.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Navbar onSearch={handleSearch} />
          <Routes>
            <Route
              path="/"
              element={
                <Watchlist
                  searchResults={searchResults}
                  searchText={movieQuery}
                  favorites={favorites}
                  setFavorites={setFavorites}
                  nextUrl={nextUrl}
                  prevUrl={prevUrl}
                />
              }
            />
            <Route
              path="/category"
              element={
                <Category
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
                  favorites={favorites}
                  setFavorites={setFavorites}
                />
              }
            />
            <Route
              path="/movies/:id"
              element={
                <MovieDetails
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
      </AuthProvider>
    </ChakraProvider>
  );
};

export default App;