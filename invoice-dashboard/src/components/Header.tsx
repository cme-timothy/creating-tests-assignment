import { Flex, Heading, Box } from "@chakra-ui/react";
import Navbar from "./Navbar";
import LogIn from "./LogIn";

export default function Header({ onToggle }: Toggle) {
  return (
    <Flex
      color="whiteAlpha.500"
      direction="column"
      p="2.5em"
      pt="1.5em"
      h="100vh"
      bg="black"
    >
      <Box>
        <Heading color="white">Dashboard</Heading>
        <Navbar onToggle={onToggle} />
      </Box>
      <Flex flex={1} />
      <Box>
        <LogIn />
      </Box>
    </Flex>
  );
}
