import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);
import { ExampleComponent } from ".";

describe("ExampleComponent", () => {
  it("fully renders without exploding", () => {
    const { getByTestId } = render(<ExampleComponent text="test" />);

    const rootElement = getByTestId("ExampleComponent-root");
    expect(rootElement).toBeTruthy();
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(<ExampleComponent />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
