import { render } from "@testing-library/react";

import { NativeSelect } from "./NativeSelect";
import { listOfStates } from "../Select/SampleData";

describe("Select", () => {
  it("fully renders without exploding", () => {
    const { getByTestId } = render(
      <NativeSelect
        data-testid="neo-native-select"
        label="List of States"
        hint="Please choose a State"
        options={listOfStates}
      />
    );

    const rootElement = getByTestId("neo-native-select");
    expect(rootElement).toBeTruthy();
  });
});
