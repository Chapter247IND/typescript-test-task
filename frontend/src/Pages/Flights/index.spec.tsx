import React from "react";
import { render } from "@testing-library/react";
import FlightPage from "./index";
import { createBrowserHistory } from "history";
import { Router } from "react-router";
import { BrowserRouter } from "react-router-dom";

test("Check if flights page exists", () => {
  const { getByText } = render(
    <BrowserRouter>
      <FlightPage />
    </BrowserRouter>
  );
  // All Flights
  expect(getByText(/All Flights/)).toBeInTheDocument();
});
