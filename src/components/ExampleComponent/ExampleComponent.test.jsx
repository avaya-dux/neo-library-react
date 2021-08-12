import { render } from "@testing-library/react";
import { ExampleComponent } from ".";

describe("ExampleComponent", () => {
  it("fully renders without exploding", () => {
    const { getByTestId } = render(<ExampleComponent text="test" />);

    const rootElement = getByTestId("ExampleComponent-root");
    expect(rootElement).toBeTruthy();
  });
});
