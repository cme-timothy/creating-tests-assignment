import { Heading, Box, Flex, Text } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { useEffect, useState, useContext } from "react";
import { DataContext } from "../../contexts/DataContext";
import Task from "../../components/Task";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import useTimer from "../../hooks/useTimer";

function Timer() {
  const { tasks, getTasks } = useContext(DataContext);
  const [running, setRunning] = useState(false);
  const [playButton, setPlayButton] = useState(false);
  const [time, setTime] = useState(0);
  const { timer, setTimer } = useTimer("");
  const [task, setTask] = useState("Choose Task");
  const [taskId, setTaskId] = useState("");

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      return clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  useEffect(() => {
    setTimer(time);
  }, [time]);

  function patchingTask(id) {
    async function patchTask() {
      await axios
        .patch(`http://localhost:4000/tasks/${id}`, {
          time: timer,
          seconds: time,
        })
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
    patchTask();
  }

  function handleTime(name, id, seconds) {
    if (taskId === "") {
      setTaskId(id);
      setTask(name);
      setTime(seconds);
      setRunning(!running);
      setPlayButton(!playButton);
    } else if (taskId === id) {
      patchingTask(id);
      setTaskId(id);
      setTask(name);
      setTime(time);
      setRunning(!running);
      setPlayButton(!playButton);
    } else {
      patchingTask(taskId);
      setTaskId(id);
      setTask(name);
      setTime(seconds);
      setRunning(true);
      setPlayButton(true);
    }
  }

  return (
    <>
      <Helmet>
        <title>Task timer</title>
      </Helmet>
      <Box position="fixed" top="0" width="100%" zIndex={1}>
        <Heading m={0} p="1.5em" pb="1em" bg={"gray.200"} align="center">
          Timer
        </Heading>
        <Box align="center" bg="gray.200" pb="2em" mb="1em">
          <Text fontSize="4xl">{timer}</Text>
          <Text fontSize="3xl" color="gray" mb="0.5em">
            {task}
          </Text>
        </Box>
      </Box>
      <Box mt="17.3em" mb="8em">
        {tasks.map((taskData) => {
          return (
            <Flex direction="column" key={uuidv4()}>
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
                currentTime={timer}
                timerId={taskId}
                playButton={playButton}
                handleTime={handleTime}
              />
            </Flex>
          );
        })}
      </Box>
    </>
  );
}

export default Timer;
