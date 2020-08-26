import React from "react";

import { render } from "@testing-library/react";
import SearchBox from "./SearchBox";

describe("Test SearchBox component", () => {
  const { getByText } = render(
    <SearchBox onSearch={(city: string) => console.log(city)} />
  );

  it("should have search button", () => {
    expect(getByText("Search")).toBeInTheDocument();
  });
});
