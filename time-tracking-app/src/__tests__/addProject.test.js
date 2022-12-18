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
import userEvent from "@testing-library/user-event";
import mockAxios from "jest-mock-axios";
import AddProject from "../pages/overview/AddProject";

const projects = {
  data: [
    {
      name: "Create Website",
      color: "blue",
      id: 1,
    },
  ],
};

const postProjects = {
  name: "Create Website",
  color: "blue",
};

const renderAddProject = () => {
  const component = render(
    <Router>
      <DataProvider>
        <AddProject />
      </DataProvider>
    </Router>
  );

  return component;
};

afterEach(cleanup);

describe("test open/close project modal, type into input, select project color and add project after input", () => {
  afterAll(() => {
    return mockAxios.reset();
  });
  test("should open and close project modal", async () => {
    mockAxios.get.mockResolvedValue(projects);
    renderAddProject();
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

  test("should be able to type into input", () => {
    renderAddProject();
    const buttonOpenElement = screen.getByTestId("buttonId-1");
    expect(buttonOpenElement).toBeInTheDocument();
    userEvent.click(buttonOpenElement);

    const inputElement = screen.getByTestId("inputId-1");
    expect(inputElement).toBeInTheDocument();
    fireEvent.change(inputElement, { target: { value: "Create Website" } });
    expect(inputElement.value).toBe("Create Website");
  });

  test("should be able to select project color blue", () => {
    renderAddProject();
    const buttonOpenElement = screen.getByTestId("buttonId-1");
    expect(buttonOpenElement).toBeInTheDocument();
    userEvent.click(buttonOpenElement);

    const buttonElement = screen.getByTestId("buttonId-4");
    expect(buttonElement).toBeInTheDocument();
    userEvent.click(buttonElement);

    const colorElement = screen.getByTestId("colorId-1");
    expect(colorElement).toBeInTheDocument();
    expect(colorElement).toHaveStyle(`
    background-color: blue;
    `);
  });

  test("should be able to click button add project after input, ", async () => {
    mockAxios.get.mockResolvedValue(projects);
    mockAxios.post.mockResolvedValue(postProjects);

    renderAddProject();
    const buttonOpenElement = screen.getByTestId("buttonId-1");
    expect(buttonOpenElement).toBeInTheDocument();
    userEvent.click(buttonOpenElement);

    const inputElement = screen.getByTestId("inputId-1");
    expect(inputElement).toBeInTheDocument();
    fireEvent.change(inputElement, { target: { value: "Create Website" } });
    expect(inputElement.value).toBe("Create Website");

    const buttonAddElement = screen.getByTestId("buttonId-3");
    expect(buttonAddElement).toBeInTheDocument();
    userEvent.click(buttonAddElement);
    await waitForElementToBeRemoved(() => screen.getByTestId("headerId-1"));
  });
});
