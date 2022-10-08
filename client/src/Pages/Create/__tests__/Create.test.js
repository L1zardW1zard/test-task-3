import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../../redux/store";
import { Provider } from "react-redux";

import Create from "../index.js";

test("Add button is enabled", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Create />
      </Provider>
    </BrowserRouter>
  );

  const input = screen.getByText(/add/i);

  expect(input).toBeEnabled();
});

test("Upload Image button is enabled", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Create />
      </Provider>
    </BrowserRouter>
  );

  const input = screen.getByText(/upload image/i);

  expect(input).toBeEnabled();
});

test("Has Nickname input", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Create />
      </Provider>
    </BrowserRouter>
  );

  const input = screen.getByPlaceholderText(/nickname/i);

  expect(input).toBeEnabled();
});

test("Has Real Name input", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Create />
      </Provider>
    </BrowserRouter>
  );

  const input = screen.getByPlaceholderText(/real Name/i);

  expect(input).toBeEnabled();
});

test("Has Origin description input", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Create />
      </Provider>
    </BrowserRouter>
  );

  const input = screen.getByPlaceholderText(/origin description/i);

  expect(input).toBeEnabled();
});

test("Has Superpowers input", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Create />
      </Provider>
    </BrowserRouter>
  );

  const input = screen.getByPlaceholderText(/superpowers/i);

  expect(input).toBeEnabled();
});

test("Has Catch phrase input", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Create />
      </Provider>
    </BrowserRouter>
  );

  const input = screen.getByPlaceholderText(/catch phrase/i);

  expect(input).toBeEnabled();
});
