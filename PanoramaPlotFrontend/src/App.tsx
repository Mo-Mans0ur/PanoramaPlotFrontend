import { Grid, GridItem } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Watchlist from "./components/Watchlist";
import Category from "./components/Category";

function App() {
  return (
    <Grid
      templateAreas={{ base: '"nav" "main"' }}
      templateRows={"auto 1fr"}
      h="100vh"
    >
      <GridItem area={"nav"}>
        <Navbar />
      </GridItem>
      <GridItem area={"main"}>
        <Watchlist />
        <Category />
        Main
      </GridItem>
    </Grid>
  );
}

export default App;
