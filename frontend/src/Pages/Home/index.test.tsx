import React from "react";
import { render } from "@testing-library/react";
import HomePage from "./index";

test("Check page main box exists", () => {
  const { container } = render(<HomePage />);
  expect(container.firstChild).toHaveClass("main-box");
});
