import { Button } from "@chakra-ui/react";

function DayButton(props) {
  return (
    <>
      <Button
        onClick={() => props.activeDay(props.today)}
        bg={props.today == props.day ? "blue.200" : "none"}
        w="2em"
        borderRadius={0}
      >
        {props.zero}
        {props.today}
      </Button>
    </>
  );
}

export default DayButton;
