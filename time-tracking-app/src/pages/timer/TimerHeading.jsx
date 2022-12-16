import { Heading, Box, Text } from "@chakra-ui/react";

function HeadingCounter(props) {
  return (
    <Box
      data-testid={"headingCounterId-1"}
      position="fixed"
      top="0"
      width="100%"
      zIndex={1}
    >
      <Heading m={0} p="1.5em" pb="1em" bg={"gray.200"} align="center">
        Timer
      </Heading>
      <Box align="center" bg="gray.200" pb="2em" mb="1em">
        <Text fontSize="4xl">{props.timer}</Text>
        <Text fontSize="3xl" color="gray" mb="0.5em">
          {props.task}
        </Text>
      </Box>
    </Box>
  );
}

export default HeadingCounter;
