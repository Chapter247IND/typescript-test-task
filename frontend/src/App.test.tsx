import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("Check container exists", () => {
  const { container } = render(<App />);
  expect(container.firstChild).toHaveClass("container");
});
