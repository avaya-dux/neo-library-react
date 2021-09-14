import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

import { IconButton } from "./IconButton";

import "@testing-library/jest-dom/extend-expect";

expect.extend(toHaveNoViolations);

describe("Button", () => {
  it("fully renders without exploding", () => {
    const { getByTestId } = render(
      <IconButton
      data-testid="neo-icon-button"
        dir="rtl"
        icon="save"
        shape="square"
        aria-label="description test"
      />
    );

    const rootElement = getByTestId("neo-icon-button");
    expect(rootElement).toBeTruthy();
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(
      <IconButton
      data-testid="neo-icon-button"
        id="test-axe"
        aria-label="test-axe-name"
        icon="save"
        shape="square"
        aria-label="description test"
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should respect the 'badge' prop", () => {
    const badgeText = "100k";
    const { getByTestId } = render(<IconButton data-testid="neo-icon-button" badge={badgeText} />);
    const rootElement = getByTestId("neo-icon-button");
    expect(rootElement).toHaveAttribute("data-badge", badgeText);
  });

  it("cuts off 'badge' text at 12 characters", () => {
    const badgeText = "12345678901234567";
    const { getByTestId } = render(<IconButton data-testid="neo-icon-button" badge={badgeText} />);
    const rootElement = getByTestId("neo-icon-button");

    expect(badgeText.length).toBe(17);
    expect(rootElement).toHaveAttribute("data-badge", badgeText.slice(0, 12));
  });
});
