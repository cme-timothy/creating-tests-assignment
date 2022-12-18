import { Flex, Button, Link } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faCalendar,
  faStopwatch,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Link as ReachLink, useLocation } from "react-router-dom";

function Header() {
  let location = useLocation();
  const [headerButton, setHeaderButton] = useState({
    stopWatch: "gray.200",
    calendar: "gray.200",
    briefcase: "gray.200",
  });

  useEffect(() => {
    if (location.pathname === "/Timer") {
      setHeaderButton({
        stopWatch: "white",
        calendar: "gray.200",
        briefcase: "gray.200",
      });
    } else if (location.pathname === "/History") {
      setHeaderButton({
        stopWatch: "gray.200",
        calendar: "white",
        briefcase: "gray.200",
      });
    } else {
      setHeaderButton({
        stopWatch: "gray.200",
        calendar: "gray.200",
        briefcase: "white",
      });
    }
  }, []);

  function handleClick(stopWatch, calendar, briefcase) {
    setHeaderButton({
      stopWatch: stopWatch,
      calendar: calendar,
      briefcase: briefcase,
    });
  }

  return (
    <Flex justify="space-around" bg="gray.200" p="1em">
      <Link as={ReachLink} to="/Timer">
        <Button
          data-testid="buttonId-timer"
          onClick={() => handleClick("white", "gray.200", "gray.200")}
          w="6em"
          h="4em"
          align="center"
          p="0.5em"
          _hover={{ bg: "white" }}
          bg={headerButton.stopWatch}
        >
          <FontAwesomeIcon icon={faStopwatch} size="3x" />
        </Button>
      </Link>
      <Link as={ReachLink} to="/History">
        <Button
          data-testid="buttonId-history"
          onClick={() => handleClick("gray.200", "white", "gray.200")}
          w="6em"
          h="4em"
          align="center"
          p="0.5em"
          _hover={{ bg: "white" }}
          bg={headerButton.calendar}
        >
          <FontAwesomeIcon icon={faCalendar} size="3x" />
        </Button>
      </Link>
      <Link as={ReachLink} to="/">
        <Button
          data-testid="buttonId-overview"
          onClick={() => handleClick("gray.200", "gray.200", "white")}
          w="6em"
          h="4em"
          align="center"
          p="0.5em"
          _hover={{ bg: "white" }}
          bg={headerButton.briefcase}
        >
          <FontAwesomeIcon icon={faBriefcase} size="3x" />
        </Button>
      </Link>
    </Flex>
  );
}

export default Header;
