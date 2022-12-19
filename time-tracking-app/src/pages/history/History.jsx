import {
  Heading,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Tooltip,
  Box,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../contexts/DataContext";
import Task from "../../components/Task";
import { v4 as uuidv4 } from "uuid";

function History() {
  const { tasks, getTasks } = useContext(DataContext);
  const [dates, setDates] = useState([]);
  const [date, setDate] = useState("");

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    const data = Array.from(new Set(tasks.map((item) => item.date)));
    setDates(data);
    if (date !== data[0] && dates.length === 0) {
      setDate(data[0]);
    }
  }, [tasks]);

  function handleMenuClick(date) {
    setDate(date);
  }

  return (
    <>
      <Helmet>
        <title>Task history</title>
      </Helmet>
      <Box position="fixed" top="0" width="100%" zIndex={1}>
        <Heading m={0} p="1.5em" bg={"gray.200"} align="center">
          History
        </Heading>
        <Flex justify="space-around">
          <Menu>
            <Tooltip label={date === undefined && "Create a Task first"}>
              <MenuButton
                data-testid="historySelect"
                isDisabled={date === undefined ? true : false}
                p="1em"
                border={0}
                m="1em 1em 0 1em"
                as={Button}
                rightIcon={<ChevronDownIcon fontSize="4xl" />}
                borderRadius={0}
              >
                <Text fontSize="lg" ml="0.5em" align="left">
                  {date === undefined ? "No history" : date}
                </Text>
              </MenuButton>
            </Tooltip>
            <MenuList>
              {dates.map((datesData) => {
                return (
                  <MenuItem
                    data-testid={`${datesData}`}
                    onClick={() => handleMenuClick(datesData)}
                    key={datesData}
                  >
                    {datesData}
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>
        </Flex>
      </Box>
      <Box mt="11.7em" mb="8em">
        <Flex direction="column">
          {tasks.map((taskData) => {
            if (date === taskData.date) {
              return (
                <Task
                  key={uuidv4()}
                  name={taskData.name}
                  color={taskData.color}
                  id={taskData.id}
                  startingTime={taskData.time}
                  timer
                />
              );
            }
          })}
        </Flex>
      </Box>
    </>
  );
}

export default History;
