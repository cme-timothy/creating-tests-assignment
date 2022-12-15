import { Link, Heading, Flex, Center } from "@chakra-ui/react";
import { Link as ReachLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";

export default function NavLink(props: {
  link: string;
  name: string;
  icon: IconDefinition;
}) {
  return (
    <Link
      as={ReachLink}
      to={props.link}
      size="xl"
      p="1em 0 1em 1em"
      textDecoration={"none"}
      _hover={{ textDecoration: "none", bg: "whiteAlpha.100", borderRadius: "10px" }}
    >
      <Flex align="center" _hover={{ color: "white" }}>
        <Center fontSize="3em" w="1em">
          <FontAwesomeIcon icon={props.icon} />
        </Center>
        <Heading fontSize="3xl" display="inline" pl="1em" pr="1em">
          {props.name}
        </Heading>
      </Flex>
    </Link>
  );
}
