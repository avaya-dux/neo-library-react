import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { Tooltip } from ".";
import {
  getIdealTooltipPosition,
  getMultilineClassName,
  MultilineClassName,
  translatePositionToCSSName,
} from "./helpers";

describe("Tooltip", () => {
  it("fully renders without exploding", () => {
    jest.spyOn(console, "warn").mockImplementation(() => {});
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
          class="neo-tooltip neo-tooltip--up neo-tooltip--onhover"
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
    describe("translatePositionToCSSName", () => {
      it("translatePositionToCSSName: generates the proper names for tooltip position", () => {
        expect(translatePositionToCSSName("bottom")).toBe("down");
        expect(translatePositionToCSSName("bottom-left")).toBe("down-left");
        expect(translatePositionToCSSName("bottom-right")).toBe("down-right");
        expect(translatePositionToCSSName("left")).toBe("left");
        expect(translatePositionToCSSName("right")).toBe("right");
        expect(translatePositionToCSSName("top")).toBe("up");
        expect(translatePositionToCSSName("top-left")).toBe("up-left");
        expect(translatePositionToCSSName("top-right")).toBe("up-right");
      });

      it("if an improper string is passed, it shows a console error", () => {
        const spy = jest.spyOn(console, "error").mockImplementation(() => {});
        translatePositionToCSSName("bad string");
        expect(spy.mock.calls.length).toBe(1);
      });

      it("if an improper string is passed, it returns 'up'", () => {
        jest.spyOn(console, "error").mockImplementation(() => {});
        expect(translatePositionToCSSName("bad string")).toBe("up");
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

    describe("getIdealTooltipPosition", () => {
      let container = {
        width: 0,
        height: 0,
      };
      let rootElementMock = {
        clientHeight: 0,
        offsetTop: 0,
        offsetLeft: 0,
        offsetHeight: 0,
        offsetWidth: 0,
      };
      beforeEach(() => {
        container = {
          width: 1000,
          height: 1000,
        };

        rootElementMock = {
          clientHeight: 0,
          offsetTop: 0,
          offsetLeft: 0,
          offsetHeight: 0,
          offsetWidth: 0,
        };
      });

      it("defaults to `up` if no 'ideal' position can be found", () => {
        const spy = jest.spyOn(console, "warn").mockImplementation(() => {});
        const actualResult = getIdealTooltipPosition(
          {
            width: 0,
            height: 0,
          },
          "test",
          rootElementMock
        );
        const expectedResult = translatePositionToCSSName("top");

        expect(actualResult).toBe(expectedResult);
        expect(spy.mock.calls.length).toBe(1);
      });

      it("returns `up` if the tooltip can be displayed above it's `rootElement` without touching the top, left, or right of it's designated container", () => {
        const spy = jest.spyOn(console, "warn").mockImplementation(() => {});

        rootElementMock.offsetTop = 100;
        rootElementMock.offsetLeft = 100;
        rootElementMock.offsetHeight = 10;
        rootElementMock.offsetWidth = 10;

        const actualResult = getIdealTooltipPosition(
          container,
          "test",
          rootElementMock
        );
        const expectedResult = translatePositionToCSSName("top");

        expect(actualResult).toBe(expectedResult);
        expect(spy.mock.calls.length).toBe(0);
      });

      it("returns `down` if the tooltip cannot be displayed above it's `rootElement`, but can be displayed below it's `rootElement` without touching the bottom, left, or right of it's designated container", () => {
        rootElementMock.offsetTop = 10;
        rootElementMock.offsetLeft = 100;
        rootElementMock.offsetWidth = 10;

        const actualResult = getIdealTooltipPosition(
          container,
          "test",
          rootElementMock
        );
        const expectedResult = translatePositionToCSSName("bottom");

        expect(actualResult).toBe(expectedResult);
      });

      it("returns `left` if the tooltip cannot be displayed above/below it's `rootElement`, but can be displayed left of it's `rootElement` without touching the top, bottom, or left of it's designated container", () => {
        container.height = 120;
        rootElementMock.offsetTop = 100;
        rootElementMock.offsetLeft = 1000;
        rootElementMock.offsetWidth = 100;

        const actualResult = getIdealTooltipPosition(
          container,
          "test",
          rootElementMock
        );
        const expectedResult = translatePositionToCSSName("left");

        expect(actualResult).toBe(expectedResult);
      });

      it("returns `right` if the tooltip cannot be displayed above/below/left it's `rootElement`, but can be displayed right of it's `rootElement` without touching the top, bottom, or right of it's designated container", () => {
        rootElementMock.offsetTop = 100;

        const actualResult = getIdealTooltipPosition(
          container,
          "test",
          rootElementMock
        );
        const expectedResult = translatePositionToCSSName("right");

        expect(actualResult).toBe(expectedResult);
      });
    });
  });
});
