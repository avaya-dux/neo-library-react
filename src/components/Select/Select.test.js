import { render } from "@testing-library/react";

import { Select } from "./Select";
import { listOfStates } from "./SampleData";

describe("Select", () => {
  it("fully renders without exploding", () => {
    const { getByTestId } = render(
      <Select
        data-testid="neo-select"
        label="List of States"
        hint="Please choose a State"
        options={listOfStates}
      />
    );

    const rootElement = getByTestId("neo-select");
    expect(rootElement).toBeTruthy();
  });
});
