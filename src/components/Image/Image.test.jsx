import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { Image } from "./Image";

describe("ExampleComponent", () => {
  it("fully renders without exploding", () => {
    const { getByTestId } = render(
      <Image data-testid="neo-image" alt="test image" role="img" />
    );

    const rootElement = getByTestId("neo-image");
    expect(rootElement).toBeTruthy();
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(
      <Image data-testid="neo-image" alt="test image" role="img" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("test for className neo is in place", () => {
    const iconClassName = "neo-img neo-img--fluid";
    const { getByTestId } = render(
      <Image data-testid="neo-image" alt="test image" />
    );

    const rootElement = getByTestId("neo-image");
    expect(rootElement).toHaveClass(iconClassName);
  });

  it("use a custom className ", () => {
    const customClassName = "ha-ha css-class-name-test";
    const { getByTestId } = render(
      <Image
        data-testid="neo-image"
        alt="test image"
        className={customClassName}
      />
    );

    const rootElement = getByTestId("neo-image");
    expect(rootElement).toHaveClass(customClassName);
  });
});
