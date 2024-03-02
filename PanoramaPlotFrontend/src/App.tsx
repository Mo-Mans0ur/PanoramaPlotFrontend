import { Grid, GridItem } from "@chakra-ui/react";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Grid templateAreas={{base: '"nav" "main"'}}>
      <GridItem area={"nav"}>
        <Navbar />
      </GridItem>
      <GridItem area={"main"} bg="dodgerblue">
        Main
      </GridItem>
    </Grid>
  );
}

export default App;
