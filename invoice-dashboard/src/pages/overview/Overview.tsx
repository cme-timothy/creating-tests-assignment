import { Helmet } from "react-helmet-async";
import {
  Flex,
  Heading,
  SimpleGrid,
  Box,
  useMediaQuery,
} from "@chakra-ui/react";
import { useDataContext } from "../../hooks/useDataContext";
import { useEffect } from "react";
import NavbarToggle from "../../components/NavbarToggle";

export default function Overview({ onToggle }: Toggle) {
  const { projects, getProjects, tasks, getTasks, invoices, getInvoices } =
    useDataContext();
  const [phoneSize] = useMediaQuery("(max-width: 950px)");

  useEffect(() => {
    getProjects();
    getTasks();
    getInvoices();
  }, []);

  function allProjects() {
    return projects.length;
  }

  function allTasks() {
    return tasks.length;
  }

  function allInvoices() {
    return invoices.length;
  }

  function handleDate(calculation: string) {
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
    let kronor = 0;
    let time = 0;
    if (calculation === "30days") {
      tasks.map((data) => {
        const pastDay = parseInt(data.date.slice(0, 2));
        const pastMonth = data.date.slice(3, 6);
        const pastYear = parseInt(
          data.date.slice(data.date.length - 4, data.date.length)
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
          time += data.seconds;
        }
      });
      return time % 60;
    } else if (calculation === "year") {
      invoices.map((data) => {
        if (data.status === "Paid") {
          const newCalender = calender.slice(indexDate - 364, indexDate + 31);
          const verified = newCalender.find((past) => {
            return past === data.expirationDate;
          });
          if (verified !== undefined) {
            kronor += data.sumTotal;
          }
        }
      });
      return kronor;
    }
  }

  return (
    <>
      <Helmet>
        <title>Invoice dashboard - Overview</title>
      </Helmet>
      <Flex direction="column" w="100%" h="100vh">
        <Flex h="5.5em" bg="white" align="center">
          {phoneSize && <NavbarToggle onToggle={onToggle} />}
          <Heading p="1em" ml={phoneSize ? "1em" : "0"}>
            Overview
          </Heading>
        </Flex>
        <SimpleGrid
          minChildWidth="23em"
          spacing="1em"
          m={phoneSize ? "2em 0 2em 0" : "2em"}
          overflow="auto"
        >
          <Box bg="white" minH="4.5em" p="1em">
            <Heading fontSize="2xl" display="inline" mr="1em">
              Projects: {allProjects()}
            </Heading>
          </Box>
          <Box bg="white" minH="4.5em" p="1em">
            <Heading fontSize="2xl">Tasks: {allTasks()}</Heading>
          </Box>
          <Box bg="white" minH="4.5em" p="1em">
            <Heading fontSize="2xl">Invoices: {allInvoices()}</Heading>
          </Box>
          <Box bg="white" minH="12em" p="1em">
            <Heading fontSize="2xl">
              Time logged past 30 days: {handleDate("30days")} min
            </Heading>
          </Box>
          <Box bg="white" minH="12em" p="1em">
            <Heading fontSize="2xl">
              Amount of kronor invoiced past year: {handleDate("year")} kr
            </Heading>
          </Box>
        </SimpleGrid>
      </Flex>
    </>
  );
}
