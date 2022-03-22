import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { Button } from "components/Button";

import { Sheet } from ".";
import * as SheetStories from "./Sheet.stories";

const { Default, Templated } = composeStories(SheetStories);

describe("Sheet", () => {
  it("fully renders without exploding", () => {
    render(<Sheet aria-label="example sheet">content</Sheet>);

    const rootElement = screen.getByRole("dialog");
    expect(rootElement).toBeInTheDocument();
  });

  it("fully renders with a title without exploding", () => {
    const { getByRole } = render(<Sheet title="example title" />);

    const rootElement = getByRole("dialog");
    expect(rootElement).toBeTruthy();
  });

  it("fully renders with a title and buttons without exploding", () => {
    const { getByRole } = render(
      <Sheet
        title="example title"
        buttons={[<Button key="example1">example</Button>]}
      />
    );

    const rootElement = getByRole("dialog");
    expect(rootElement).toBeTruthy();
  });

  it("allows the passing of `<div>` props", () => {
    const text = "content example";
    const { getByText } = render(<Sheet style={{ width: 100 }}>{text}</Sheet>);
    const { getByRole } = render(
      <Sheet title="full sheet" style={{ width: 100 }} />
    );

    const basicSheetRootElement = getByText(text);
    const sheetRootElement = getByRole("dialog");

    expect(basicSheetRootElement).toHaveStyle("width: 100px");
    expect(sheetRootElement).toHaveStyle("width: 100px");
  });

  it("throws error if buttons are passed without a title", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() =>
      render(<Sheet buttons={[<Button key="example1">example</Button>]} />)
    ).toThrow();
    expect(spy).toHaveBeenCalled();
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
