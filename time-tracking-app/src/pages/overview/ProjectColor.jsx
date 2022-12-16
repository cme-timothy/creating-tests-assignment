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
  const [bg, setBg] = useState("blue");

  function handleColorClick(color) {
    setBg(color);
    addProjectColor(color);
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Button data-testid="colorId-1" mt="1em" bg={bg} w="3em" h="3em"></Button>
      </PopoverTrigger>
      <PopoverContent align="center" ml="0.5em" w="100%">
        <PopoverArrow ml="-0.5em" />
        <PopoverBody>
          <Button
            data-testid="buttonId-3"
            onClick={() => handleColorClick("blue")}
            bg="blue"
            w="3em"
            h="3em"
          ></Button>
          <Button
            onClick={() => handleColorClick("pink")}
            ml="0.5em"
            bg="pink"
            w="3em"
            h="3em"
          ></Button>
          <Button
            onClick={() => handleColorClick("orange")}
            ml="0.5em"
            bg="orange"
            w="3em"
            h="3em"
          ></Button>
          <Button
            onClick={() => handleColorClick("cyan")}
            ml="0.5em"
            bg="cyan"
            w="3em"
            h="3em"
          ></Button>
          <Button
            onClick={() => handleColorClick("green")}
            ml="0.5em"
            bg="green"
            w="3em"
            h="3em"
          ></Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export default ProjectColor;
