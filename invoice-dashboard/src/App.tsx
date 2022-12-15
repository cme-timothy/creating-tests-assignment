import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import { Flex, useDisclosure, Slide, useMediaQuery } from "@chakra-ui/react";
import Main from "./components/Main";
import Header from "./components/Header";
import { DataProvider } from "./contexts/DataContext";

export default function App() {
  const { isOpen, onToggle } = useDisclosure();
  const [phoneSize] = useMediaQuery("(max-width: 950px)");
  return (
    <HelmetProvider>
      <Router>
        <DataProvider>
          <Flex bg="blackAlpha.50">
            {phoneSize ? (
              <Slide direction="left" in={isOpen} style={{ zIndex: 10 }}>
                <Header onToggle={onToggle} />
              </Slide>
            ) : (
              <Header onToggle={onToggle} />
            )}
            <Main onToggle={onToggle} />
          </Flex>
        </DataProvider>
      </Router>
    </HelmetProvider>
  );
}
