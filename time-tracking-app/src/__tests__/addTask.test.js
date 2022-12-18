import { BrowserRouter as Router } from "react-router-dom";
import {
  render,
  screen,
  waitForElementToBeRemoved,
  cleanup,
  fireEvent,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { DataProvider } from "../contexts/DataContext";
import { calenderYear, localMonth } from "../data/calenderData";
import userEvent from "@testing-library/user-event";
import mockAxios from "jest-mock-axios";
import AddTask from "../pages/overview/AddTask";

const projects = {
  data: [
    {
      name: "Create Website",
      color: "blue",
      id: 1,
    },
  ],
};

const postTasks = {
  project: "Create Website",
  color: "blue",
  name: "Create modal",
  date: "18 December 2022",
  time: "00:00:00",
  seconds: 0,
};

const renderAddTask = () => {
  const component = render(
    <Router>
      <DataProvider>
        <AddTask
          projects={[{ name: "Create Website", color: "blue", id: 1 }]}
        />
      </DataProvider>
    </Router>
  );

  return component;
};

afterEach(cleanup);

describe("test open/close task modal, type into input, select task date and add task after input", () => {
  afterAll(() => {
    return mockAxios.reset();
  });
  test("should open and close task modal", async () => {
    renderAddTask();
    const buttonOpenElement = screen.getByTestId("buttonId-1");
    expect(buttonOpenElement).toBeInTheDocument();
    userEvent.click(buttonOpenElement);
    const headerElement = screen.getByTestId("headerId-1");
    expect(headerElement).toBeInTheDocument();

    const buttonCloseElement = screen.getByTestId("buttonId-2");
    expect(buttonCloseElement).toBeInTheDocument();
    userEvent.click(buttonCloseElement);
    await waitForElementToBeRemoved(() => screen.getByTestId("headerId-1"));
  });

  test("should be able to type into input", async () => {
    renderAddTask();
    const buttonOpenElement = screen.getByTestId("buttonId-1");
    expect(buttonOpenElement).toBeInTheDocument();
    userEvent.click(buttonOpenElement);

    const inputElement = screen.getByTestId("inputId-1");
    expect(inputElement).toBeInTheDocument();
    fireEvent.change(inputElement, { target: { value: "Create modal" } });
    expect(inputElement.value).toBe("Create modal");
  });

  test("should be able to select task date, if selected .map rerenders", async () => {
    renderAddTask();
    const buttonOpenElement = screen.getByTestId("buttonId-1");
    expect(buttonOpenElement).toBeInTheDocument();
    userEvent.click(buttonOpenElement);

    const buttonDayElement = screen.getByTestId(
      `${Object.values(calenderYear)[localMonth - 1]}`
    );
    expect(buttonDayElement).toBeInTheDocument();
    expect(buttonDayElement).toHaveTextContent(
      Object.values(calenderYear)[localMonth - 1]
    );
    userEvent.click(buttonDayElement);
    expect(buttonDayElement).not.toBeInTheDocument();
  });

  test("should be able to click button add task after input", async () => {
    mockAxios.get.mockResolvedValue(projects);
    mockAxios.post.mockResolvedValue(postTasks);

    renderAddTask();
    const buttonOpenElement = screen.getByTestId("buttonId-1");
    expect(buttonOpenElement).toBeInTheDocument();
    userEvent.click(buttonOpenElement);

    const inputElement = screen.getByTestId("inputId-1");
    expect(inputElement).toBeInTheDocument();
    fireEvent.change(inputElement, { target: { value: "Create modal" } });
    expect(inputElement.value).toBe("Create modal");

    const buttonAddElement = screen.getByTestId("buttonId-3");
    expect(buttonAddElement).toBeInTheDocument();
    userEvent.click(buttonAddElement);

    await waitForElementToBeRemoved(() => screen.getByTestId("headerId-1"));
  });
});
