import { Helmet } from "react-helmet-async";
import { useEffect, useState, useContext } from "react";
import { DataContext } from "../../contexts/DataContext";
import axios from "axios";
import useTimer from "../../hooks/useTimer";
import TimerHeading from "./TimerHeading";
import TaskList from "./TaskList";

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
      <TimerHeading timer={timer} task={task} />
      <TaskList
        tasks={tasks}
        currentTime={timer}
        taskId={taskId}
        playButton={playButton}
        handleTime={handleTime}
      />
    </>
  );
}

export default Timer;
