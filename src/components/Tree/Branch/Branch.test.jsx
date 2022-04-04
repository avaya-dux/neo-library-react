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

  it("adds 'selected' class when branch is selected", () => {
    render(<Branch selected>example</Branch>);

    const rootElement = screen.getByRole("treeitem");
    expect(rootElement).toHaveClass("neo-treeview__item--selected");
  });

  it("adds an icon if `icon` prop has a value", () => {
    render(<Branch icon="file">example</Branch>);

    const iconElement = screen.getByRole("img");
    expect(iconElement).toBeInTheDocument();
  });
});
