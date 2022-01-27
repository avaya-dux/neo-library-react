import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { MenuButton } from ".";

describe("MenuButton", () => {
  it("fully renders without exploding", () => {
    const { getByRole: getByRole1 } = render(<MenuButton />);
    const rootElement1 = getByRole1("button");
    expect(rootElement1).toBeTruthy();

    const { getByRole: getByRole2 } = render(
      <MenuButton>MenuButton</MenuButton>
    );
    const rootElement2 = getByRole2("button");
    expect(rootElement2).toBeTruthy();
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(<MenuButton />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
