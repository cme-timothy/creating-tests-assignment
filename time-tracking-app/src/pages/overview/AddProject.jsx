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
} from "@chakra-ui/react";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { DataContext } from "../../contexts/DataContext";
import ProjectColor from "./ProjectColor";
import AddInput from "./AddInput";

function AddProject() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inputValue, setInputValue] = useState("");
  const [projectName, setProjectName] = useState();
  const { getProjects, getTasks } = useContext(DataContext);
  const [projectColor, setProjectColor] = useState("blue.500");

  function addProjectColor(color) {
    setProjectColor(color);
  }

  useEffect(() => {
    async function postProject() {
      await axios
        .post("http://localhost:4000/projects", {
          name: projectName,
          color: projectColor,
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
      getProjects();
      getTasks();
    }
    if (inputValue !== "") {
      postProject();
      setInputValue("");
    }
  }, [projectName]);

  function handleChange(event) {
    const value = event.target.value;
    setInputValue(value);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && inputValue !== "") {
      setProjectName(inputValue);
      onClose();
    }
  }

  function handleClick() {
    if (inputValue !== "") {
      setProjectName(inputValue);
      onClose();
    }
  }

  return (
    <>
      <Button
        data-testid="buttonId-1"
        onClick={onOpen}
        m="1em"
        colorScheme="green"
        w="70%"
        align="center"
        borderRadius={0}
        justifySelf="flex-end"
        alignSelf="center"
      >
        Add a Project
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius={0} h="35em">
          <ModalHeader data-testid="headerId-1">New Project</ModalHeader>
          <ModalCloseButton data-testid="buttonId-2" />
          <ModalBody>
            <AddInput
              name={"Project name"}
              handleChange={handleChange}
              handleKeyDown={handleKeyDown}
              inputValue={inputValue}
            ></AddInput>
            <ProjectColor addProjectColor={addProjectColor} />
          </ModalBody>

          <ModalFooter>
            <Button
              data-testid="buttonId-3"
              colorScheme="green"
              w="100%"
              borderRadius={0}
              onClick={handleClick}
            >
              Add Project
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddProject;
