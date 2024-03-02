// Importer nødvendige komponenter og hooks fra biblioteker
import { Grid, GridItem } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Watchlist from "./components/Watchlist";
import Category from "./components/Category";
import MovieDetails from "./components/MovieDetail";
import { useState } from "react"; // Importer useState

// Definerer en interface til at beskrive strukturen af movieQuery objektet
export interface MovieQuery {
  searchText: string;
}

// Definerer App komponenten
function App({}) {
  // Bruger useState til at oprette en state variabel og en funktion til at opdatere den
  const [movieQuery, setMovieQuery] = useState<MovieQuery>({
    searchText: "",
  }); 

  // Returnerer JSX, der repræsenterer UI for App komponenten
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
              // Opdaterer movieQuery når søgeteksten ændres
              setMovieQuery({ ...movieQuery, searchText })
            }
          />
        </GridItem>
        <GridItem area={"main"}>
        <Switch>
            <Route exact path="/" render={() => <Watchlist movieQuery={movieQuery}/>} />
            <Route path="/category" render={() => <Category movieQuery={movieQuery} />} />
            <Route path="/movie/:id" component={MovieDetails} />
          </Switch>
        </GridItem>
      </Grid>
    </Router>
  );
}

// Eksporterer App komponenten som standard eksport
export default App;