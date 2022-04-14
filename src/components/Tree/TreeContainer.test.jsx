import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { TreeContainer } from ".";
import * as TreeStories from "./Tree.stories";

const { Default, DirectionExamples, EmbededActions, TreeItemExamples } =
  composeStories(TreeStories);

describe("Tree", () => {
  it("fully renders without exploding", () => {
    render(<TreeContainer label="example label" />);

    const rootElement = screen.getByRole("tree");
    expect(rootElement).toBeInTheDocument();
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(<TreeContainer label="example label" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("throws error if no label is passed", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<TreeContainer />)).toThrow();
    expect(spy).toHaveBeenCalled();
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

    describe("TreeItemExamples", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<TreeItemExamples />);
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

    describe("DirectionExamples", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<DirectionExamples />);
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

    describe("EmbededActions", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<EmbededActions />);
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
