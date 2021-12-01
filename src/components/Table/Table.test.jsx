import { composeStories } from "@storybook/testing-react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { Table } from ".";
import { FilledFields } from "./mock-data";
import * as TableStories from "./Table.stories";

const { Default, EmptyDataSet, BareBones, Templated } =
  composeStories(TableStories);

describe("Table", () => {
  jest.spyOn(console, "warn").mockImplementation(() => {}); // ignore tooltip warnings

  it("fully renders without exploding", () => {
    const { getByRole } = render(<Table {...FilledFields} />);

    const tableElement = getByRole("table");
    expect(tableElement).toBeTruthy();
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(<Table {...FilledFields} />);
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

    describe("EmptyDataSet", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<EmptyDataSet />);
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

    describe("BareBones", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<BareBones />);
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
