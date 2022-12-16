import OverviewButton from "../pages/overview/OverviewButton";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DataProvider } from "../contexts/DataContext";

test("should render Task Button and if projects === [] be disabled", () => {
  render(
    <DataProvider>
      <OverviewButton name={"Tasks"} menuToggle={true} projects={[]} />
    </DataProvider>
  );
  const element = screen.getByText("Tasks");
  expect(element).toBeInTheDocument();
  expect(element.disabled).toBe(true);
});
