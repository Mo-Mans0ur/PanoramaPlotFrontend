import { Grid, GridItem } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Watchlist from "./components/Watchlist";
import Category from "./components/Category";
import React, { useState } from "react"; // Import useState

export interface MovieQuery {
  searchText: string;
}

function App() {
  const [movieQuery, setMovieQuery] = useState<MovieQuery>({
    searchText: "",
  }); // Declare and initialize setMovieQuery

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
            setMovieQuery({ ...movieQuery, searchText })
          }
        />
      </GridItem>
      <GridItem area={"main"}>
        <Switch>
          <Route path="/" component={Watchlist} />
          <Route path="/category" component={Category} />
          <Route path="/movie/:id" component={MovieDetails} />
        </Switch>
      </GridItem>
    </Grid>
  </Router>
  );
}

export default App;