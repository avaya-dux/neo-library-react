import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { Branch } from ".";
import * as BranchStories from "./Branch.stories";

const { BranchExamples } = composeStories(BranchStories);

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

  describe("storybook tests", () => {
    describe("BranchExamples", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<BranchExamples />);
      });

      it("should render ok", () => {
        const { container } = renderResult;
        expect(container).not.toBe(null);
      });

      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });
  });
});
