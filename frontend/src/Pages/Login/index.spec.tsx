import React from "react";
import LoginPage from "./index";
import { render } from "@testing-library/react";

test("Check login page exists", () => {
  const { container } = render(<LoginPage />);
  expect(container.firstChild).toHaveClass("login-box");
});
