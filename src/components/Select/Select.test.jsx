import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { items } from "./Select.stories";

import { Select } from "./Select";

describe("Select", () => {
  let renderResult;
  beforeEach(() => {
    renderResult = render(<Select label="Test Select Label" items={items} />);
  });
  it("renders without exploding", () => {
    const { container } = renderResult;
    expect(container).not.toBe(null);
  });
  it("passes the correct props to ")
  it("passes basic axe compliance", async () => {
    const { container } = renderResult;
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
