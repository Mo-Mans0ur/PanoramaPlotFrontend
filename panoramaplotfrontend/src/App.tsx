import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, useColorMode } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Watchlist from './components/Watchlist';
import MovieDetails from './components/MovieDetails';
import Category from './components/Category';
import Favorites from './components/Favorites';
import Footer from './components/Footer';
import theme from './theme';
import './styles/App.css';
import { AuthProvider, useAuth } from './components/AuthContext';
import { Movie } from './types';

const AppContent: React.FC = () => {
  const [movieQuery, setMovieQuery] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set<string>());
  const [nextUrl, setNextUrl] = useState<string>('');
  const [prevUrl, setPrevUrl] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const { colorMode } = useColorMode();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    document.body.classList.toggle('light-mode', colorMode === 'light');
    document.body.classList.toggle('dark-mode', colorMode === 'dark');
  }, [colorMode]);

  useEffect(() => {
    if (!isLoggedIn) {
      setFavorites(new Set<string>());
    }
  }, [isLoggedIn]);

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
    <>
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
              isLoggedIn={isLoggedIn}
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
              favorites={favorites}
              setFavorites={setFavorites}
            />
          }
        />
        
      </Routes>
      <Footer />
    </>
  );
};

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
};

export default App;
