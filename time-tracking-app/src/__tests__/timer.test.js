import { BrowserRouter as Router } from "react-router-dom";
import { render, screen, waitFor, cleanup, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { DataProvider } from "../contexts/DataContext";
import { HelmetProvider } from "react-helmet-async";
import Timer from "../pages/timer/Timer";
import mockAxios from "jest-mock-axios";

const data = {
  data: [
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
  ],
};

const renderTimer = () => {
  const component = render(
    <HelmetProvider>
      <Router>
        <DataProvider>
          <Timer />
        </DataProvider>
      </Router>
    </HelmetProvider>
  );

  return component;
};

afterEach(cleanup);

describe("test see list of tasks and start timer", () => {
  afterAll(() => {
    return mockAxios.reset();
  });

  test("should see list of tasks", async () => {
    mockAxios.get.mockResolvedValueOnce(data);
    renderTimer();
    const resolvedElement = await waitFor(() => screen.getAllByTestId("tasks"));
    expect(resolvedElement[0]).toBeInTheDocument();
    expect(resolvedElement[1]).toBeInTheDocument();
    expect(resolvedElement.length).toBe(2);
  });

  jest.useFakeTimers();

  test("should start timer", async () => {
    mockAxios.get.mockResolvedValueOnce(data);
    renderTimer();

    const resolvedElement = await waitFor(() =>
      screen.getByTestId("Website button")
    );
    expect(resolvedElement).toBeInTheDocument();

    const timeBeforeElement = await waitFor(() =>
      screen.getByTestId("Website button-time")
    );
    expect(timeBeforeElement).toHaveTextContent("00:00:00");

    const playElement = await waitFor(() =>
      screen.getByTestId("Website button-play")
    );
    userEvent.click(playElement);
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    const timeAfterElement = await waitFor(() =>
      screen.getByTestId("Website button-time")
    );
    expect(timeAfterElement).toHaveTextContent("00:00:05");
  });
});
