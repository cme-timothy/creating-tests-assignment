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
import Overview from "../pages/overview/Overview";

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

describe("test open/close project modal, type into input, select project color and delete project on click", () => {
  test("should open and close project modal", async () => {
    renderOverview();
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
    renderOverview();
    const buttonOpenElement = screen.getByTestId("buttonId-1");
    expect(buttonOpenElement).toBeInTheDocument();
    fireEvent.click(buttonOpenElement);

    const inputElement = screen.getByTestId("inputId-1");
    expect(inputElement).toBeInTheDocument();
    fireEvent.change(inputElement, { target: { value: "Create Website" } });
    expect(inputElement.value).toBe("Create Website");
  });

  test("should be able to select project color blue", () => {
    renderOverview();
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

  test("should be able to click button add project after input and delete project on click, ", async () => {
    renderOverview();
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

    const removeButtonElement = screen.getByTestId("Create Website");
    fireEvent.click(removeButtonElement);
    await waitForElementToBeRemoved(() => screen.getByTestId("Create Website"));
  });
});
