import { Flex, Text, Button, Box } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faCirclePlay,
  faCircleStop,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { DataContext } from "../contexts/DataContext";
import { useContext } from "react";

function Task(props) {
  const { getTasks } = useContext(DataContext);

  function handleDelete() {
    async function deleteTask() {
      await axios
        .delete(`http://localhost:4000/tasks/${props.id}`)
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
      getTasks();
    }
    deleteTask();
  }

  function handlePlayButton() {
    props.handleTime(props.name, props.id, props.seconds);
  }

  return (
    <Flex
      h="5em"
      justify="space-between"
      align="center"
      m="1em"
      p="1em"
      bg="gray.200"
      borderLeft="10px solid"
      borderColor={props.color}
    >
      <Box>
        <Text mt="0.1em" fontSize="lg">
          {props.name}
        </Text>
        {props.timer && (
          <Text fontSize="md" color="gray.500">
            {props.timerId === props.id ? props.currentTime : props.startingTime}
          </Text>
        )}
      </Box>
      {!props.play && !props.timer && (
        <Button bg="gray.200" onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrash} size="lg" />
        </Button>
      )}
      {props.play && (
        <Button p={0} mr="1em" bg="gray.200" onClick={handlePlayButton}>
          {props.timerId !== props.id ? (
            <Box color="green.500">
              <FontAwesomeIcon icon={faCirclePlay} size="2xl" />
            </Box>
          ) : props.timerId === props.id && !props.playButton ? (
            <Box color="green.500">
              <FontAwesomeIcon icon={faCirclePlay} size="2xl" />
            </Box>
          ) : (
            props.timerId === props.id &&
            props.playButton && (
              <Box color="red.500">
                <FontAwesomeIcon icon={faCircleStop} size="2xl" />
              </Box>
            )
          )}
        </Button>
      )}
    </Flex>
  );
}

export default Task;
