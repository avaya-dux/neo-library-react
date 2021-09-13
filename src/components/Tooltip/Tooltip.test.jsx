import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { Tooltip } from ".";
import {
  getMultilineClassName,
  getTooltipPosition,
  MultilineClassName,
} from "./helpers";

describe("Tooltip", () => {
  it("fully renders without exploding", () => {
    const id = "tooltipid";
    const { getByRole } = render(
      <Tooltip children="text" label="default tooltip text" />
    );

    const rootElement = getByRole("tooltip");
    expect(rootElement).toBeTruthy();
  });

  it("matches it's previous snapshot", () => {
    const { container } = render(
      <Tooltip id="example" label="default tooltip text">
        text
      </Tooltip>
    );
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="neo-tooltip neo-tooltip--down neo-tooltip--onhover"
        >
          <div
            aria-describedby="example"
          >
            text
          </div>
          <div
            class="neo-tooltip__content neo-tooltip__content--multiline"
            id="example"
            role="tooltip"
          >
            <div
              class="neo-arrow"
            />
            default tooltip text
          </div>
        </div>
      </div>
    `);
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(<Tooltip label="text">text</Tooltip>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  describe("helper methods", () => {
    describe("getTooltipPosition", () => {
      it("getTooltipPosition: generates the proper names for tooltip position", () => {
        expect(getTooltipPosition("bottom")).toBe("down");
        expect(getTooltipPosition("bottom-left")).toBe("down-left");
        expect(getTooltipPosition("bottom-right")).toBe("down-right");
        expect(getTooltipPosition("left")).toBe("left");
        expect(getTooltipPosition("right")).toBe("right");
        expect(getTooltipPosition("top")).toBe("up");
        expect(getTooltipPosition("top-left")).toBe("up-left");
        expect(getTooltipPosition("top-right")).toBe("up-right");
      });

      it("if an improper string is passed, it shows a console error", () => {
        const spy = jest.spyOn(console, "error").mockImplementation(() => {});
        getTooltipPosition("bad string");
        expect(spy.mock.calls.length).toBe(1);
      });

      it("if an improper string is passed, it returns 'left'", () => {
        jest.spyOn(console, "error").mockImplementation(() => {});
        expect(getTooltipPosition("bad string")).toBe("left");
      });
    });

    describe("getMultilineClassName", () => {
      it("if an improper value is passed, it shows a console error", () => {
        const spy = jest.spyOn(console, "error").mockImplementation(() => {});
        getMultilineClassName("bad value");
        expect(spy.mock.calls.length).toBe(1);
      });
      it("if an improper value is passed, it returns `MultilineClassName`", () => {
        const spy = jest.spyOn(console, "error").mockImplementation(() => {});
        expect(getMultilineClassName("bad value")).toBe(MultilineClassName);
      });
      it("returns `MultilineClassName` if passed `undefined` or `true`", () => {
        expect(getMultilineClassName()).toBe(MultilineClassName);
        expect(getMultilineClassName(true)).toBe(MultilineClassName);
      });
      it("returns `undefined` if passed `false`", () => {
        expect(getMultilineClassName(false)).toBe(undefined);
      });
    });
  });
});
