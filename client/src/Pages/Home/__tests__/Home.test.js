import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../../redux/store";
import { Provider } from "react-redux";

import Home from "../index.js";

it("Has pagination", async () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Home heroAmount={16} />
      </Provider>
    </BrowserRouter>
  );

  const paginationList = await screen.findByRole("list");

  expect(paginationList).toHaveClass("pagination");
});

// it("Has hero blocks", async () => {
//   render(
//     <BrowserRouter>
//       <Provider store={store}>
//         <Home heroAmount={16} />
//       </Provider>
//     </BrowserRouter>
//   );

//   const heroList = await screen.findAllByTestId("hero");
//   screen.debug();
// });
