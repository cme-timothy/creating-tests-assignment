import { Button } from "@chakra-ui/react";

function DayButton(props) {
  return (
    <>
      <Button
        data-testid={`${props.today}`}
        onClick={() => props.activeDay(props.today)}
        bg={props.today == props.day ? "pink" : "none"}
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
