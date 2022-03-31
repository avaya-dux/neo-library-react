import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { Tree } from ".";
import * as TreeStories from "./Tree.stories";

const { Default, Templated } = composeStories(TreeStories);

describe("Tree", () => {
  it("fully renders without exploding", () => {
    render(<Tree />);

    const rootElement = screen.getByRole("tree");
    expect(rootElement).toBeInTheDocument();
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(<Tree />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  describe("storybook tests", () => {
    describe("Default", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<Default />);
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

    describe("Templated", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<Templated />);
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
