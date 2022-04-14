import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { TreeItem } from ".";

describe("TreeItem", () => {
  it("fully renders without exploding", () => {
    render(<TreeItem>example</TreeItem>);

    const rootElement = screen.getByRole("treeitem");
    expect(rootElement).toBeInTheDocument();
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(
      <div role="tree">
        <TreeItem>example</TreeItem>
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("adds 'selected' class when treeitem is selected", () => {
    render(<TreeItem selected>example</TreeItem>);

    const rootElement = screen.getByRole("treeitem");
    expect(rootElement).toHaveClass("neo-treeview__item--selected");
  });
});
