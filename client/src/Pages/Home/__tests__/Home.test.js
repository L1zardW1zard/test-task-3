import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../../redux/store";
import { Provider } from "react-redux";

import "@testing-library/jest-dom";

import Home from "../index.js";

const MockHomePage = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Home heroAmount={16} />
      </Provider>
    </BrowserRouter>
  );
};

it("Has pagination", async () => {
  render(<MockHomePage />);

  const paginationList = await screen.findByRole("list");

  expect(paginationList).toHaveClass("pagination");
});

///////// I don't know how it works help pls
it("Has hero blocks", async () => {
  render(<MockHomePage />);

  screen.debug();
  expect(await screen.findAllByTestId("hero", {}, { timeout: 3000 }));

  screen.debug();
});
