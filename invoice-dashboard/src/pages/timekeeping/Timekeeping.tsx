import { Helmet } from "react-helmet-async";
import {
  Flex,
  Heading,
  TableContainer,
  Table,
  Thead,
  Tr,
  Td,
  Th,
  Tbody,
  Button,
  TableCaption,
  Box,
  useMediaQuery,
} from "@chakra-ui/react";
import { useDataContext } from "../../hooks/useDataContext";
import { useEffect } from "react";
import axios from "axios";
import NavbarToggle from "../../components/NavbarToggle";

export default function Timekeeping({ onToggle }: Toggle) {
  const { tasks, getTasks, token } = useDataContext();
  const [phoneSize] = useMediaQuery("(max-width: 950px)");

  useEffect(() => {
    getTasks(true);
  }, []);

  async function patchTask(id: number) {
    const accessToken = token();
    if (accessToken !== false) {
      try {
        await axios.patch(
          `http://localhost:3000/tasks/${id}`,
          { seconds: 0, time: "00:00:00" },
          {
            headers: {
              Authorization: `Bearer ${accessToken.accessToken}`,
            },
          }
        );
        getTasks(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("not logged in");
    }
  }

  function handleDate(pastDates: string) {
    const date = new Date().toLocaleString().slice(0, 10);
    const year = parseInt(date.slice(6, 10));

    const calenderYear = {
      January: 31,
      February: 28,
      March: 31,
      April: 30,
      May: 31,
      June: 30,
      July: 31,
      August: 31,
      September: 30,
      October: 31,
      November: 30,
      December: 31,
    };

    const calender: string[] = [];
    for (let y = year - 1; y <= year + 1; y++) {
      for (let m = 0; m <= 12; m++) {
        for (let d = 1; d <= Object.values(calenderYear)[m - 1]; d++) {
          calender.push(`${d}/${m}/${y}`);
        }
      }
    }

    const indexDate = calender.findIndex((indexDate) => {
      return indexDate === date;
    });

    const calenderMonths = [
      "empty",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const pastDay = parseInt(pastDates.slice(0, 2));
    const pastMonth = pastDates.slice(3, 6);
    const pastYear = parseInt(
      pastDates.slice(pastDates.length - 4, pastDates.length)
    );

    const indexMonth = calenderMonths.findIndex((indexMonth) => {
      return indexMonth === pastMonth;
    });

    const correctDate = `${pastDay}/${indexMonth}/${pastYear}`;
    const newCalender = calender.slice(indexDate - 29, indexDate + 1);
    const verified = newCalender.find((past) => {
      return past === correctDate;
    });
    if (verified !== undefined) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <>
      <Helmet>
        <title>Invoice dashboard - Timekeeping</title>
      </Helmet>
      <Flex direction="column" w="100%" h="100vh">
        <Flex h="5.5em" bg="white" align="center">
          {phoneSize && <NavbarToggle onToggle={onToggle} />}
          <Heading p="1em" ml={phoneSize ? "1em" : "0"}>
            Timekeeping
          </Heading>
        </Flex>
        <Flex direction="column" overflow="auto">
          <Box minH="min-content">
            <TableContainer m={phoneSize ? "2em 0 2em 0" : "2em"} bg="white">
              <Table variant="simple">
                <TableCaption>Timekeeping list past 30 days</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Time</Th>
                    <Th pl="0em">Task</Th>
                    <Th pl="0em">Date</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {tasks.map((task) => {
                    const verified = handleDate(task.date);
                    if (verified) {
                      return (
                        <Tr
                          key={task.id}
                          borderTop="1px solid"
                          borderBottom="1px Solid"
                          borderColor="gray.100"
                        >
                          <Td>{task.time}</Td>
                          <Td pl="0em">{task.name}</Td>
                          <Td pl="0em">{task.date}</Td>
                        </Tr>
                      );
                    }
                  })}
                </Tbody>
              </Table>
            </TableContainer>
            <TableContainer m={phoneSize ? "2em 0 2em 0" : "2em"} bg="white">
              <Table variant="simple">
                <TableCaption>Timekeeping list</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Time</Th>
                    <Th>Task</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {tasks.map((task) => {
                    return (
                      <Tr
                        key={task.id}
                        borderTop="1px solid"
                        borderBottom="1px Solid"
                        borderColor="gray.100"
                      >
                        <Td>{task.time}</Td>
                        <Td>{task.name}</Td>
                        <Td p="0.5em">
                          <Button onClick={() => patchTask(task.id)}>
                            Delete
                          </Button>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
