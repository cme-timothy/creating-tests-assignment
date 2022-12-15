import { Flex, Heading, Button, Box, Tooltip, Text } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { useState, useEffect, useContext } from "react";
import AddProject from "../overview/AddProject";
import AddTask from "../overview/AddTask";
import Project from "../../components/Project";
import Task from "../../components/Task";
import { DataContext } from "../../contexts/DataContext";
import { v4 as uuidv4 } from "uuid";

function Overview() {
  const [menuToggle, setMenuToggle] = useState(true);
  const { projects, getProjects, tasks, getTasks } = useContext(DataContext);

  useEffect(() => {
    getProjects();
    getTasks();
  }, []);

  return (
    <>
      <Helmet>
        <title>Time tracking app</title>
      </Helmet>
      <Box position="fixed" top="0" width="100%" zIndex={1}>
        <Heading m={0} p="1.5em" bg={"gray.200"} align="center">
          Overview
        </Heading>
        <Flex justifyContent="space-evenly">
          <Button
            fontSize="xl"
            onClick={() => setMenuToggle(true)}
            borderRadius={0}
            w="100%"
            bg={menuToggle ? "gray.400" : "gray.100"}
            _active={{ bg: menuToggle ? "gray.400" : "gray.100" }}
            _hover={{ bg: "gray.400" }}
          >
            Projects
          </Button>
          <Tooltip label={projects.length === 0 && "Create a Project first"}>
            <Button
              isDisabled={projects.length === 0 ? true : false}
              fontSize="xl"
              onClick={() => setMenuToggle(false)}
              borderRadius={0}
              w="100%"
              bg={!menuToggle ? "gray.400" : "gray.100"}
              _active={{ bg: !menuToggle ? "gray.400" : "gray.100" }}
              _hover={{ bg: "gray.400" }}
            >
              Tasks
            </Button>
          </Tooltip>
        </Flex>
      </Box>
      <Box mt="11.5em" mb="8em">
        {menuToggle ? (
          <Flex direction="column">
            {projects.map((data) => {
              return (
                <Project
                  key={data.name}
                  name={data.name}
                  color={data.color}
                  id={data.id}
                />
              );
            })}
          </Flex>
        ) : (
          <>
            {projects.map((projectData) => {
              return (
                <Flex direction="column" key={uuidv4()}>
                  <Text ml="1em" fontSize="lg" color="gray.500">
                    {projectData.name}
                  </Text>
                  {tasks.map((taskData) => {
                    if (projectData.name === taskData.project) {
                      return (
                        <Task
                          key={uuidv4()}
                          name={taskData.name}
                          color={taskData.color}
                          id={taskData.id}
                        />
                      );
                    }
                  })}
                </Flex>
              );
            })}
          </>
        )}
        <Flex direction="column">
          {menuToggle ? <AddProject /> : <AddTask projects={projects} />}
        </Flex>
      </Box>
    </>
  );
}

export default Overview;
