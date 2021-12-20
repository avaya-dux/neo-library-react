import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

import { Button } from "./Button";

import "@testing-library/jest-dom/extend-expect";

expect.extend(toHaveNoViolations);

describe("Button", () => {
  it("fully renders without exploding", () => {
    const { getByTestId } = render(
      <Button data-testid="neo-button" label="Test" />
    );

    const rootElement = getByTestId("neo-button");
    expect(rootElement).toBeTruthy();
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(
      <Button
        data-testid="neo-button"
        id="test-axe"
        aria-label="test-axe-name"
        label="Button"
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should respect the 'badge' prop", () => {
    const badgeText = "100k";
    const { getByTestId } = render(
      <Button data-testid="neo-button" badge={badgeText} label="badge test" />
    );
    const rootElement = getByTestId("neo-button");
    expect(rootElement).toHaveAttribute("data-badge", badgeText);
  });

  it("cuts off 'badge' text at 12 characters", () => {
    const badgeText = "12345678901234567";
    const { getByTestId } = render(
      <Button data-testid="neo-button" badge={badgeText} label="test" />
    );
    const rootElement = getByTestId("neo-button");

    expect(badgeText.length).toBe(17);
    expect(rootElement).toHaveAttribute("data-badge", badgeText.slice(0, 12));
  });
});
