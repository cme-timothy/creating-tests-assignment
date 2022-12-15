import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Main from "./components/Main";
import Header from "./components/Header";
import { DataProvider } from "./contexts/DataContext";

function App() {
  return (
    <HelmetProvider>
      <Router>
        <DataProvider>
          <Main />
        </DataProvider>
        <Box position="fixed" bottom="0" width="100%">
          <Header />
        </Box>
      </Router>
    </HelmetProvider>
  );
}

export default App;
