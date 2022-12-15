import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { DataContext } from "../../contexts/DataContext";
import Calender from "./Calender";

function AddTask(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inputValue, setInputValue] = useState("");
  const [taskName, setTaskName] = useState();
  const [project, setProject] = useState(props.projects[0].name);
  const [projectColor, setProjectColor] = useState(props.projects[0].color);
  const [projectId, setProjectId] = useState(props.projects[0].id);
  const { getTasks } = useContext(DataContext);
  const [date, setDate] = useState();

  useEffect(() => {
    async function postTask() {
      await axios
        .post(`http://localhost:4000/projects/${projectId}/tasks`, {
          project: project,
          color: projectColor,
          name: taskName,
          date: date,
          time: "00:00:00",
          seconds: 0,
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
    if (inputValue !== "") {
      postTask();
      setInputValue("");
    }
  }, [taskName]);

  function handleChange(event) {
    const value = event.target.value;
    setInputValue(value);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && inputValue !== "") {
      setTaskName(inputValue);
      onClose();
    }
  }

  function handleClick() {
    if (inputValue !== "") {
      setTaskName(inputValue);
      onClose();
    }
  }

  function handleMenuClick(project, color, id) {
    setProject(project);
    setProjectColor(color);
    setProjectId(id);
  }

  function handleCalender(date) {
    setDate(date);
  }

  return (
    <>
      <Button
        onClick={onOpen}
        m="1em"
        colorScheme="green"
        w="70%"
        align="center"
        borderRadius={0}
        justifySelf="flex-end"
        alignSelf="center"
      >
        Add a Task
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius={0} h="35em">
          <ModalHeader>New Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              type="text"
              placeholder="Task name"
              borderRadius={0}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              value={inputValue}
            ></Input>
            <Menu>
              <MenuButton
                border={0}
                mt="1em"
                as={Button}
                rightIcon={<ChevronDownIcon fontSize="4xl" />}
                borderRadius={0}
              >
                <Text fontSize="lg" ml="0.5em" align="left">
                  {project}
                </Text>
              </MenuButton>
              <MenuList>
                {props.projects.map((data) => {
                  return (
                    <MenuItem
                      onClick={() =>
                        handleMenuClick(data.name, data.color, data.id)
                      }
                      key={data.id}
                    >
                      {data.name}
                    </MenuItem>
                  );
                })}
              </MenuList>
            </Menu>
            <Calender date={handleCalender} />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="green"
              w="100%"
              borderRadius={0}
              onClick={handleClick}
            >
              Add Task
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddTask;
