import React from "react";
import { render } from "@testing-library/react";
import FlightsList from "./index";

test("Check flights list exists", () => {
  const { getByTestId } = render(<FlightsList />);
  expect(getByTestId("table")).toBeInTheDocument();
});
