import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import DayButton from "./DayButton";

function Calender({ date }) {
  const [days, setDays] = useState([]);
  const [day, setDay] = useState(
    Number(new Date().toLocaleString().slice(0, 2))
  );
  const [month, setMonth] = useState(
    Number(new Date().toLocaleString().slice(3, 5))
  );
  const [year, setYear] = useState(
    Number(new Date().toLocaleString().slice(6, 10))
  );

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

  useEffect(() => {
    const days = [];
    for (let i = 1; i <= Object.values(calenderYear)[month - 1]; i++) {
      days.push(i);
    }
    setDays(days);
    date(`${day} ${Object.keys(calenderYear)[month - 1]} ${year}`);
  }, [month]);

  function activeDay(thisDay) {
    setDay(thisDay);
    date(`${thisDay} ${Object.keys(calenderYear)[month - 1]} ${year}`);
  }

  function handleMonth(icon) {
    if (icon === "back") {
      if (month === 1) {
        setMonth((prev) => prev + 11);
        setYear((prev) => prev - 1);
      } else {
        setMonth((prev) => prev - 1);
      }
    } else {
      if (month === 12) {
        setMonth((prev) => prev - 11);
        setYear((prev) => prev + 1);
      } else {
        setMonth((prev) => prev + 1);
      }
    }
  }

  return (
    <Box data-testid="calenderId-1" mt="2em" align="center">
      <Box>
        <Button
          onClick={() => handleMonth("back")}
          p={0}
          bg="none"
          _hover={{ bg: "none" }}
          _active={{ bg: "none" }}
        >
          {<ArrowBackIcon mb="0.2em" />}
        </Button>
        <Text display="inline" fontSize="lg">
          {Object.keys(calenderYear)[month - 1]} {year}
        </Text>
        <Button
          onClick={handleMonth}
          p={0}
          bg="none"
          _hover={{ bg: "none" }}
          _active={{ bg: "none" }}
        >
          {<ArrowForwardIcon mb="0.2em" />}
        </Button>
      </Box>
      <Flex flexWrap="wrap" w="18em" ml="0.7em">
        {days.map((today) => {
          if (today < 10) {
            return (
              <DayButton
                key={uuidv4()}
                today={today}
                day={day}
                activeDay={activeDay}
                zero={0}
              />
            );
          } else {
            return (
              <DayButton
                key={uuidv4()}
                today={today}
                day={day}
                activeDay={activeDay}
              />
            );
          }
        })}
      </Flex>
    </Box>
  );
}

export default Calender;
