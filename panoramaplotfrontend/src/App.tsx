import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Watchlist from "./components/Watchlist";
import MovieDetails from "./components/MovieDetails";
import Category from "./components/Category";
import Favorites from "./components/Favorites";
import Login from "./components/Login";
import theme from "./theme";
import "./styles/App.css";

interface Movie {
  OriginalTitle: string;
  year: string;
  Id: string;
  type: string;
  PosterPath: string;
  genre: string;
}

const App: React.FC = () => {
  const [movieQuery, setMovieQuery] = useState("");
  const [favorites, setFavorites] = useState<Set<string>>(new Set<string>());
  const [nextUrl, setNextUrl] = useState<string>("");
  const [prevUrl, setPrevUrl] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);

  const handleSearch = async (searchText: string) => {
    setMovieQuery(searchText);

    // Perform the fetch and update searchResults here
    try {
      const response = await fetch(`http://localhost:5074/movies/search/${searchText}`);
      const data = await response.json();
      console.log("SearchResults from App.tsx: ", data.data)
      setSearchResults(data.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Navbar onSearch={handleSearch} />
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
