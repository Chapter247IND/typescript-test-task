import React from "react";

import { render } from "@testing-library/react";
import SearchHistory from "./SearchHistory";

describe("Test SearchHistory component", () => {
  const { getByText } = render(
    <SearchHistory isLoading={false} historyData={[]} />
  );

  it("should have `Recent Searches` text", () => {
    expect(getByText(/Recent Searches/i)).toBeInTheDocument();
  });
});
