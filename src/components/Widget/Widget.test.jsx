import { composeStories } from "@storybook/testing-react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import * as WidgetStories from "./Widget.stories";

const {
  BasicWidget,
  ExampleOne,
  ExampleTwo,
  ExampleThree,
  EmptyWidget,
  LoadingWidget,
  LoadingEmptyWidget,
} = composeStories(WidgetStories);

describe("Widget", () => {
  describe("Storybook", () => {
    describe("BasicWidget", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<BasicWidget />);
      });
      it("should render ok", () => {
        const { container } = renderResult;
        expect(container).toBeDefined();
      });
      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });
    describe("ExampleOne", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<ExampleOne />);
      });
      it("should render ok", () => {
        const { container } = renderResult;
        expect(container).toBeDefined();
      });
      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });
    describe("ExampleTwo", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<ExampleTwo />);
      });
      it("should render ok", () => {
        const { container } = renderResult;
        expect(container).toBeDefined();
      });
      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });
    describe("ExampleThree", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<ExampleThree />);
      });
      it("should render ok", () => {
        const { container } = renderResult;
        expect(container).toBeDefined();
      });
      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });
    describe("EmptyWidget", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<EmptyWidget />);
      });
      it("should render ok", () => {
        const { container } = renderResult;
        expect(container).toBeDefined();
      });
      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });
    describe("LoadingWidget", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<LoadingWidget />);
      });
      it("should render ok", () => {
        const { container } = renderResult;
        expect(container).toBeDefined();
      });
      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });
    describe("LoadingEmptyWidget", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<LoadingEmptyWidget />);
      });
      it("should render ok", () => {
        const { container } = renderResult;
        expect(container).toBeDefined();
      });
      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });
  });
});
