import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";

import { TreeContainer, TreeItem } from "../";

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

  it("adds 'selected' class when treeitem is clicked", () => {
    render(
      <TreeContainer aria-label="tree label">
        <TreeItem>example</TreeItem>
      </TreeContainer>
    );

    const rootElement = screen.getByRole("treeitem");
    userEvent.click(rootElement);
    expect(rootElement).toHaveClass("neo-treeview__item--selected");
  });
});
