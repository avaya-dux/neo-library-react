import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";

import { Button } from "components/Button";

import { SubTree } from ".";
import { Branch } from "../Branch";
import { Tree } from "../Tree";

describe("SubTree", () => {
  it("fully renders without exploding", () => {
    render(<SubTree edges={[<Branch key="one">one</Branch>]}>example</SubTree>);

    const treeitems = screen.getAllByRole("treeitem");
    expect(treeitems).toHaveLength(2);

    const groupUl = screen.getByRole("group");
    expect(groupUl).toBeInTheDocument();
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(
      <div role="tree">
        <SubTree edges={[<Branch key="one">one</Branch>]}>example</SubTree>
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  describe("interactivity", () => {
    const branchText = "branch";
    const buttonText = "button";
    const subTreeText = "sub tree";

    beforeEach(() => {
      render(
        <Tree aria-label="testing tree">
          <SubTree
            actions={[<Button key="btn-one">{buttonText}</Button>]}
            edges={[<Branch key="one">{branchText}</Branch>]}
          >
            {subTreeText}
          </SubTree>
        </Tree>
      );
    });

    it("expands and collapses when children are clicked", () => {
      const subtreeEdges = screen.getByRole("group");
      const subtreeTitle = screen.getByText(subTreeText);

      expect(subtreeEdges).toBeInTheDocument();
      expect(subtreeEdges).toHaveClass("neo-display-none");
      expect(subtreeEdges).toHaveAttribute("aria-expanded", "false");

      expect(subtreeTitle).toBeInTheDocument();

      userEvent.click(subtreeTitle);

      expect(subtreeEdges).not.toHaveClass("neo-display-none");
      expect(subtreeEdges).toHaveAttribute("aria-expanded", "true");

      userEvent.click(subtreeTitle);

      expect(subtreeEdges).toHaveClass("neo-display-none");
      expect(subtreeEdges).not.toHaveAttribute("aria-expanded", "true");
    });
    it("does _not_ expand/collapse when `actions` are clicked", () => {
      const subtreeEdges = screen.getByRole("group");
      const button = screen.getByText(buttonText);

      expect(subtreeEdges).toBeInTheDocument();
      expect(subtreeEdges).toHaveClass("neo-display-none");
      expect(subtreeEdges).toHaveAttribute("aria-expanded", "false");

      expect(button).toBeInTheDocument();

      userEvent.click(button);

      expect(subtreeEdges).toHaveClass("neo-display-none");
      expect(subtreeEdges).toHaveAttribute("aria-expanded", "false");
    });

    it("on keyboard space/enter, sets active=>true and toggles expanded", () => {
      const subtreeEdges = screen.getByRole("group");
      const subtreeTitle = screen.getByText(subTreeText);

      expect(subtreeEdges).toBeInTheDocument();
      expect(subtreeEdges).toHaveClass("neo-display-none");
      expect(subtreeEdges).toHaveAttribute("aria-expanded", "false");

      expect(subtreeTitle).toBeInTheDocument();

      userEvent.click(subtreeTitle);

      expect(subtreeEdges).not.toHaveClass("neo-display-none");
      expect(subtreeEdges).toHaveAttribute("aria-expanded", "true");

      userEvent.keyboard("{space}");

      expect(subtreeEdges).toHaveClass("neo-display-none");
      expect(subtreeEdges).not.toHaveAttribute("aria-expanded", "true");

      userEvent.keyboard("{enter}");

      expect(subtreeEdges).not.toHaveClass("neo-display-none");
      expect(subtreeEdges).toHaveAttribute("aria-expanded", "true");
    });
  });
});
