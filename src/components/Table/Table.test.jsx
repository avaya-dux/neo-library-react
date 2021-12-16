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

  it("allows the passing of default selected rows", () => {
    const { getByLabelText } = render(
      <Table
        {...FilledFields}
        selectableRows="multiple"
        itemsPerPageOptions={[50]}
        defaultSelectedRowIds={[
          FilledFields.data[0].id,
          FilledFields.data[1].id,
        ]}
      />
    );

    const checkbox0 = getByLabelText(FilledFields.data[0].label);
    const checkbox1 = getByLabelText(FilledFields.data[1].label);
    expect(checkbox0).toHaveAttribute("checked");
    expect(checkbox1).toHaveAttribute("checked");

    const checkbox2 = getByLabelText(FilledFields.data[2].label);
    expect(checkbox2).not.toHaveAttribute("checked");
  });

  // TODO-567: implement
  // it("properly selects 'all' and 'none' of the checkboxes", () => {});

  // TODO-567: implement
  // it("matches it's previous snapshot", () => {
  //   const { container } = render(<Table {...defaultProps} />);
  //   expect(container).toMatchInlineSnapshot();
  // });

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

  // TODO-567: implement
  // describe("helpers", () => {
  //   // calculateAriaSortValue
  //   // convertRowIdsArrayToObject
  // });
});
