import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
} from "@chakra-ui/react";
import { useState } from "react";

function ProjectColor({ addProjectColor }) {
  const [bg, setBg] = useState("blue.500");

  function handleColorClick(color) {
    setBg(color);
    addProjectColor(color);
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Button mt="1em" bg={bg} w="3em" h="3em"></Button>
      </PopoverTrigger>
      <PopoverContent align="center" ml="0.5em" w="100%">
        <PopoverArrow ml="-0.5em"/>
        <PopoverBody>
          <Button
            onClick={() => handleColorClick("blue.500")}
            bg="blue.500"
            w="3em"
            h="3em"
          ></Button>
          <Button
            onClick={() => handleColorClick("pink.500")}
            ml="0.5em"
            bg="pink.500"
            w="3em"
            h="3em"
          ></Button>
          <Button
            onClick={() => handleColorClick("orange.500")}
            ml="0.5em"
            bg="orange.500"
            w="3em"
            h="3em"
          ></Button>
          <Button
            onClick={() => handleColorClick("cyan.500")}
            ml="0.5em"
            bg="cyan.500"
            w="3em"
            h="3em"
          ></Button>
          <Button
            onClick={() => handleColorClick("green.500")}
            ml="0.5em"
            bg="green.500"
            w="3em"
            h="3em"
          ></Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export default ProjectColor;
