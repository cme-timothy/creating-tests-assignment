import Header from "../components/Header";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

afterEach(cleanup);

test("should render Briefcase Button and display white background-color at start of app", () => {
  render(
    <Router>
      <Header />
    </Router>
  );
  const element = screen.getByTestId("buttonId-overview");
  expect(element).toBeInTheDocument();
  expect(element).toHaveStyle(`
  background-color: white;
`);
});
