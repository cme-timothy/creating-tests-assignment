import TimerHeading from "../pages/timer/TimerHeading";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

test("should render TimerHeading Text element and display 00:00:00 and Choose Task at start of app", () => {
  render(<TimerHeading timer={"00:00:00"} task={"Choose Task"} />);
  const element = screen.getByTestId("headingCounterId-1");
  expect(element).toBeInTheDocument();
  expect(element).toHaveTextContent("00:00:00" && "Choose Task");
});
