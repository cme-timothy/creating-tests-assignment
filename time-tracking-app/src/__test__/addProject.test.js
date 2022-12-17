import AddProject from "../pages/overview/AddProject";
import { BrowserRouter as Router } from "react-router-dom";
import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { DataProvider } from "../contexts/DataContext";

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

describe("test open/close project modal, type into input and select project color", () => {
  test("should open and close project modal", async () => {
    renderAddProject();
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
    renderAddProject();
    const buttonOpenElement = screen.getByTestId("buttonId-1");
    expect(buttonOpenElement).toBeInTheDocument();
    fireEvent.click(buttonOpenElement);

    const inputElement = screen.getByTestId("inputId-1");
    expect(inputElement).toBeInTheDocument();
    fireEvent.change(inputElement, { target: { value: "Create Website" } });
    expect(inputElement.value).toBe("Create Website");
  });

  test("should be able to select project color blue", () => {
    renderAddProject();
    const buttonOpenElement = screen.getByTestId("buttonId-1");
    expect(buttonOpenElement).toBeInTheDocument();
    fireEvent.click(buttonOpenElement);

    const buttonElement = screen.getByTestId("buttonId-4");
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);

    const colorElement = screen.getByTestId("colorId-1");
    expect(colorElement).toBeInTheDocument();
    expect(colorElement).toHaveStyle(`
    background-color: blue;
    `);
  });

  test("should be able to click button add project after input", async () => {
    renderAddProject();
    const buttonOpenElement = screen.getByTestId("buttonId-1");
    expect(buttonOpenElement).toBeInTheDocument();
    fireEvent.click(buttonOpenElement);

    const inputElement = screen.getByTestId("inputId-1");
    expect(inputElement).toBeInTheDocument();
    fireEvent.change(inputElement, { target: { value: "Create Website" } });
    expect(inputElement.value).toBe("Create Website");

    const buttonAddElement = screen.getByTestId("buttonId-3");
    expect(buttonAddElement).toBeInTheDocument();
    fireEvent.click(buttonAddElement);
    await waitForElementToBeRemoved(() => screen.getByTestId("headerId-1"));
  });
});
