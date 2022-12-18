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
import { HelmetProvider } from "react-helmet-async";
import TaskList from "../pages/timer/TaskList";
import Timer from "../pages/timer/Timer";

const renderTaskList = () => {
  const component = render(
    <TaskList
      tasks={[
        {
          name: "Website button",
          time: "00:00:00",
          seconds: 0,
          id: 1,
          color: "blue",
        },
        {
          name: "Website input",
          time: "00:00:00",
          seconds: 0,
          id: 2,
          color: "red",
        },
      ]}
    />
  );

  return component;
};

const renderTimer = () => {
  const component = render(
    <HelmetProvider>
      <Router>
        <DataProvider>
          <Timer
            tasks={[
              {
                name: "Website button",
                time: "00:00:00",
                seconds: 0,
                id: 1,
                color: "blue",
              },
              {
                name: "Website input",
                time: "00:00:00",
                seconds: 0,
                id: 2,
                color: "red",
              },
            ]}
          />
        </DataProvider>
      </Router>
    </HelmetProvider>
  );

  return component;
};

afterEach(cleanup);

describe("test see list of tasks and start and stop timer", () => {
  test("should see list of tasks", async () => {
    renderTaskList();
    const taskElements = screen.getAllByTestId("tasks");
    expect(taskElements[0]).toBeInTheDocument();
    expect(taskElements[1]).toBeInTheDocument();
    expect(taskElements.length).toBe(2);
  });

  test("should start and stop timer", () => {
    const component = renderTimer();
  });
});
