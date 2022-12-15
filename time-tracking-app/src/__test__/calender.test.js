import Calender from "../pages/overview/Calender";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

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

test("should render calender component and have the correct date displayed", () => {
  const month = Number(new Date().toLocaleString().slice(3, 5));
  const year = Number(new Date().toLocaleString().slice(6, 10));
  const correctDate = `${Object.keys(calenderYear)[month - 1]} ${year}`;
  function handleCalender(date) {
    console.log(`Is this the correct date? ${date}`);
  }
  render(<Calender date={handleCalender} />);
  const linkElement = screen.getByTestId("calenderId-1");
  expect(linkElement).toBeInTheDocument();
  expect(linkElement).toHaveTextContent(correctDate);
});
