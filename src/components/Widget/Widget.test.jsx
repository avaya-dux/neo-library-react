import { composeStories } from "@storybook/testing-react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import * as WidgetStories from "./Widget.stories";

const {
  BasicWidget,
  UsageExample,
  EmptyWidget,
  DisabledWidget,
  InteractiveWidget,
  LoadingEmptyWidget,
  ScrollableWidget,
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
    describe("UsageExample", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<UsageExample />);
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
    describe("DisabledWidget", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<DisabledWidget />);
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
    describe("InteractiveWidget", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<InteractiveWidget />);
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
    describe("ScrollableWidget", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<ScrollableWidget />);
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
