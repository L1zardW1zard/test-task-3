import { render, screen, getByText } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Header from "../index.js";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";

test("load header title", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Header />
      </Provider>
    </BrowserRouter>
  );

  const text = screen.getByText(/test task for jsninjas/i);

  expect(text).toBeInTheDocument();
});

test(`load header Add New "button"`, () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Header />
      </Provider>
    </BrowserRouter>
  );

  const text = screen.getByText(/add new/i);

  expect(text).toBeInTheDocument();
});
