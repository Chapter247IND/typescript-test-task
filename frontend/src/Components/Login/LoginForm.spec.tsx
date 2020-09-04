import React from "react";
import { render, fireEvent } from "@testing-library/react";
import LoginForm from "./LoginForm";
import { act } from "react-dom/test-utils";

test("Check submit login form", async () => {
  const onSubmit = jest.fn();

  const { getByTestId } = render(
    <LoginForm onLogin={onSubmit} isLoading={false} />
  );
  const username = getByTestId("username");
  const password = getByTestId("password");
  const loginForm = getByTestId("login-form");

  await act(async () => {
    await fireEvent.change(username, {
      target: { value: "testuser123" },
    });
  });

  await act(async () => {
    await fireEvent.change(password, {
      target: { value: "123456" },
    });
  });

  await act(async () => {
    await fireEvent.submit(loginForm);
  });

  expect(onSubmit).toHaveBeenCalled();
});
