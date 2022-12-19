import Calender from "../pages/overview/Calender";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { calenderYear, localMonth, localYear } from "../data/calenderData";

afterEach(cleanup);

describe("render Calender component and display the correct calender dates", () => {
  test("should render the calender component and have the correct date displayed", () => {
    const correctDate = `${
      Object.keys(calenderYear)[localMonth - 1]
    } ${localYear}`;
    function handleCalender() {}
    render(<Calender dates={handleCalender} />);
    const element = screen.getByTestId("calenderId-1");
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent(correctDate);
  });

  test("should render the correct amount of Day Button elements", () => {
    render(<Calender dates={() => null} />);
    const element = screen.getByText(
      `${Object.values(calenderYear)[localMonth - 1]}`
    );
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent(
      Object.values(calenderYear)[localMonth - 1]
    );
  });
});
