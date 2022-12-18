import { BrowserRouter as Router } from "react-router-dom";
import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
  cleanup,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { DataProvider } from "../contexts/DataContext";
import AddTask from "../pages/overview/AddTask";
import { calenderYear, localMonth } from "../data/calenderData";
import { v4 as uuidv4 } from "uuid";
import Overview from "../pages/overview/Overview";
import { HelmetProvider } from "react-helmet-async";

const renderAddTask = () => {
  const component = render(
    <Router>
      <DataProvider>
        <AddTask
          projects={[{ name: "Create Website", color: "blue", id: uuidv4() }]}
        />
      </DataProvider>
    </Router>
  );

  return component;
};

const renderOverview = () => {
  const component = render(
    <HelmetProvider>
      <Router>
        <DataProvider>
          <Overview />
        </DataProvider>
      </Router>
    </HelmetProvider>
  );

  return component;
};

afterEach(cleanup);

describe("test open/close task modal, type into input, select task date and delete task on click", () => {
  test("should open and close task modal", async () => {
    renderAddTask();
    const buttonOpenElement = screen.getByTestId("buttonId-1");
    expect(buttonOpenElement).toBeInTheDocument();
    fireEvent.click(buttonOpenElement);
    const headerElement = screen.getByTestId("headerId-1");
    expect(headerElement).toBeInTheDocument();

    const buttonCloseElement = screen.getByTestId("buttonId-2");
    expect(buttonCloseElement).toBeInTheDocument();
    fireEvent.click(buttonCloseElement);
    await waitForElementToBeRemoved(() => screen.getByTestId("headerId-1"));
  });

  test("should be able to type into input", () => {
    renderAddTask();
    const buttonOpenElement = screen.getByTestId("buttonId-1");
    expect(buttonOpenElement).toBeInTheDocument();
    fireEvent.click(buttonOpenElement);

    const inputElement = screen.getByTestId("inputId-1");
    expect(inputElement).toBeInTheDocument();
    fireEvent.change(inputElement, { target: { value: "Create modal" } });
    expect(inputElement.value).toBe("Create modal");
  });

  test("should be able to select task date, if selected .map rerenders", () => {
    renderAddTask();
    const buttonOpenElement = screen.getByTestId("buttonId-1");
    expect(buttonOpenElement).toBeInTheDocument();
    fireEvent.click(buttonOpenElement);

    const buttonDayElement = screen.getByTestId(
      `${Object.values(calenderYear)[localMonth - 1]}`
    );
    expect(buttonDayElement).toBeInTheDocument();
    expect(buttonDayElement).toHaveTextContent(
      Object.values(calenderYear)[localMonth - 1]
    );
    fireEvent.click(buttonDayElement);
    expect(buttonDayElement).not.toBeInTheDocument();
  });

  test("should be able to click button add task after input and delete project on click", async () => {
    renderOverview();
    const buttonOpenElement = screen.getByTestId("buttonId-1");
    expect(buttonOpenElement).toBeInTheDocument();
    fireEvent.click(buttonOpenElement);

    const inputElement = screen.getByTestId("inputId-1");
    expect(inputElement).toBeInTheDocument();
    fireEvent.change(inputElement, { target: { value: "Create modal" } });
    expect(inputElement.value).toBe("Create modal");

    const buttonAddElement = screen.getByTestId("buttonId-3");
    expect(buttonAddElement).toBeInTheDocument();
    fireEvent.click(buttonAddElement);
    await waitForElementToBeRemoved(() => screen.getByTestId("headerId-1"));

    const removeButtonElement = screen.getByTestId("Create modal");
    fireEvent.click(removeButtonElement);
    await waitForElementToBeRemoved(() => screen.getByTestId("Create modal"));
  });
});
