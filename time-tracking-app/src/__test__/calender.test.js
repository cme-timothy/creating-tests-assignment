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
const month = Number(new Date().toLocaleString().slice(3, 5));
const year = Number(new Date().toLocaleString().slice(6, 10));
describe("render Calender component and display the correct calender dates", () => {
  test("should render the calender component and have the correct date displayed", () => {
    const correctDate = `${Object.keys(calenderYear)[month - 1]} ${year}`;
    function handleCalender() {}
    render(<Calender date={handleCalender} />);
    const element = screen.getByTestId("calenderId-1");
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent(correctDate);
  });

  test("should render the correct amount of Day Button elements", () => {
    const correctDate = `${Object.keys(calenderYear)[month - 1]}`;
    render(<Calender date={() => null} />);
    const element = screen.getByText(
      `${Object.values(calenderYear)[month - 1]}`
    );
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent(Object.values(calenderYear)[month - 1]);
  });
});
