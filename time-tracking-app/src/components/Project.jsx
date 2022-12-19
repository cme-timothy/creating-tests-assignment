import { Flex, Text, Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { DataContext } from "../contexts/DataContext";
import { useContext } from "react";

function Project(props) {
  const { getProjects } = useContext(DataContext);

  function handleClick() {
    async function deleteProject() {
      await axios
        .delete(`http://localhost:4000/projects/${props.id}`)
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
      getProjects();
    }
    deleteProject();
  }

  return (
    <Flex
      h="5em"
      justify="space-between"
      align="center"
      m="1em"
      p="1em"
      bg={"gray.200"}
      borderLeft="10px solid"
      borderColor={props.color}
    >
      <Text data-testid={`${props.name}`} mt="0.1em" fontSize="lg">
        {props.name}
      </Text>
      <Button
        data-testid={`${props.name}-delete`}
        bg="gray.200"
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faTrash} size="lg" />
      </Button>
    </Flex>
  );
}

export default Project;
