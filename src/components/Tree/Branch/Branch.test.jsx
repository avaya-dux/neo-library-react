import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { Branch } from ".";

describe("Branch", () => {
  it("fully renders without exploding", () => {
    render(<Branch>example</Branch>);

    const rootElement = screen.getByRole("treeitem");
    expect(rootElement).toBeInTheDocument();
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(
      <div role="tree">
        <Branch>example</Branch>
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
