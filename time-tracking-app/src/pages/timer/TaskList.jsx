import { Box, Flex, Text } from "@chakra-ui/react";
import Task from "../../components/Task";
import { v4 as uuidv4 } from "uuid";

function TaskList({ tasks, currentTime, taskId, playButton, handleTime }) {
  return (
    <Box mt="17.3em" mb="8em">
      {tasks.map((taskData) => {
        return (
          <Flex data-testid="tasks" direction="column" key={uuidv4()}>
            <Text ml="1em" fontSize="lg" color="gray.500">
              {taskData.date}
            </Text>
            <Task
              name={taskData.name}
              color={taskData.color}
              id={taskData.id}
              startingTime={taskData.time}
              seconds={taskData.seconds}
              play
              timer
              currentTime={currentTime}
              timerId={taskId}
              playButton={playButton}
              handleTime={handleTime}
            />
          </Flex>
        );
      })}
    </Box>
  );
}

export default TaskList;
