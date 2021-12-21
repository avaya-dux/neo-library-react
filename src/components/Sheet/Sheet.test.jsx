import { composeStories } from "@storybook/testing-react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { Button } from "components/Button";

import { Sheet } from ".";
import * as SheetStories from "./Sheet.stories";

const { Default, Templated } = composeStories(SheetStories);

describe("Sheet", () => {
  it("fully renders without exploding", () => {
    const id = "sheet-test";
    const { getByTestId } = render(<Sheet id={id}>content</Sheet>);

    const rootElement = getByTestId(id);
    expect(rootElement).toBeTruthy();
  });

  it("fully renders with a title without exploding", () => {
    const { getByRole } = render(<Sheet title="example title" />);

    const rootElement = getByRole("dialog");
    expect(rootElement).toBeTruthy();
  });

  it("throws a `console.error` if buttons are passed without a title", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    const { getByRole } = render(
      <Sheet buttons={[<Button key="example1">example</Button>]} />
    );

    const rootElement = getByRole("dialog");
    expect(rootElement).toBeTruthy();
    expect(spy.mock.calls.length).toBe(1);
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(<Sheet />);
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
