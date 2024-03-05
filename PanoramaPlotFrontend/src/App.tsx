// Import necessary components and hooks from libraries
import { Grid, GridItem } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Watchlist from "./components/Watchlist";
import Category from "./components/Category";
import MovieDetails from "./components/MovieDetail";
import LikeButton from "./components/LikeButton";

// Define an interface to describe the structure of the movieQuery object
export interface MovieQuery {
  searchText: string;
}

// Define the App component
function App() {
  // Use useState to create a state variable and a function to update it
  const [movieQuery, setMovieQuery] = useState<MovieQuery>({
    searchText: "",
  });
  const [favorites, setFavorites] = useState(new Set()); // Initialize your favorites state here

  // Return JSX representing the UI for the App component
  return (
    <Router>
      <Grid
        templateAreas={{ base: '"nav" "main"' }}
        templateRows={"auto 1fr"}
        h="100vh"
      >
        <GridItem area={"nav"}>
          <Navbar
            onSearch={(searchText) =>
              // Update movieQuery when the search text changes
              setMovieQuery({ ...movieQuery, searchText })
            }
          />
        </GridItem>
        <GridItem area={"main"}>
          <Switch>
            <Router>
              <Grid
                templateAreas={{ base: '"nav" "main"' }}
                templateRows={"auto 1fr"}
                h="100vh"
              >
                <GridItem area={"nav"}>
                  {/* Navbar and its functionality */}
                </GridItem>
                <GridItem area={"main"}>
                  <Switch>
                    <Route
                      exact
                      path="/"
                      render={(routeProps) => (
                        <Watchlist {...routeProps} movieQuery={movieQuery} />
                      )}
                    />
                    <Route
                      path="/category"
                      render={(routeProps) => (
                        <Category {...routeProps} movieQuery={movieQuery} />
                      )}
                    />
                    <Route
                      path="/movie/:id"
                      render={(routeProps) => (
                        <MovieDetails
                          {...routeProps}
                          favorites={favorites}
                          setFavorites={setFavorites}
                        />
                      )}
                    />
                    {/* Remove the duplicate Route */}
                  </Switch>
                </GridItem>
              </Grid>
            </Router>
          </Switch>
        </GridItem>
      </Grid>
    </Router>
  );
}

// Export the App component as the default export
export default App;
