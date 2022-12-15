import { Button } from "@chakra-ui/react";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { useState } from "react";

export default function NavbarToggle({ onToggle }: Toggle) {
  const [toggle, setToggle] = useState(false);

  function handleClick() {
    onToggle();
    setToggle(!toggle);
  }

  return (
    <Button
      fontSize="2xl"
      h="3.7em"
      borderRadius="none"
      size="xs"
      colorScheme="black"
      bg="black"
      position="absolute"
      onClick={handleClick}
      zIndex="11"
    >
      {toggle ? <ChevronRightIcon /> : <ChevronLeftIcon />}
    </Button>
  );
}
