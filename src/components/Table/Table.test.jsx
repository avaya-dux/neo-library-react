import { composeStories } from "@storybook/testing-react";
import { fireEvent, render } from "@testing-library/react";
import { axe } from "jest-axe";

import { Table } from ".";
import { calculateAriaSortValue, convertRowIdsArrayToObject } from "./helpers";
import { FilledFields } from "./mock-data";
import * as TableStories from "./Table.stories";

const {
  BareBones,
  CustomActions,
  Default,
  EditableData,
  EmptyDataSet,
  SelectableRows,
  Templated,
} = composeStories(TableStories);

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

  it("properly selects 'all' and 'none' of the checkboxes", () => {
    const { getByLabelText, container } = render(
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

    const headerCheckbox = getByLabelText(
      FilledFields.translations.header.selectAll
    );
    const headerCheckboxLabel = container.querySelector("tr th label");
    const checkbox2 = getByLabelText(FilledFields.data[2].label);

    // header checkbox is in "indeterminate" state
    expect(headerCheckbox.checked).toBeTruthy();
    expect(headerCheckbox).toHaveClass("neo-check--indeterminate");
    expect(checkbox2.checked).toBeFalsy();

    fireEvent.click(headerCheckboxLabel);

    // header checkbox is in `true` state
    expect(headerCheckbox.checked).toBeTruthy();
    expect(headerCheckbox).not.toHaveClass("neo-check--indeterminate");
    expect(checkbox2.checked).toBeTruthy();

    fireEvent.click(headerCheckboxLabel);

    // header checkbox is in `false` state
    expect(headerCheckbox.checked).toBeFalsy();
    expect(headerCheckbox).not.toHaveClass("neo-check--indeterminate");
    expect(checkbox2.checked).toBeFalsy();
  });

  // TODO-770: implement
  // it("matches it's previous default snapshot", () => {
  //   const { container } = render(<Table {...FilledFields} />);
  //   expect(container).toMatchInlineSnapshot();
  // });

  describe("helpers", () => {
    describe("calculateAriaSortValue", () => {
      it("should return 'none' when `isSorted === false`", () => {
        expect(calculateAriaSortValue(false, undefined)).toBe("none");
        expect(calculateAriaSortValue(false, "ascending")).toBe("none");
        expect(calculateAriaSortValue(false, "descending")).toBe("none");
      });

      it("should return 'other' when `isSorted === true && sortedDir === undefined`", () => {
        expect(calculateAriaSortValue(true, undefined)).toBe("other");
      });

      it("should return 'ascending' when `isSorted === true && sortedDir === 'ascending'`", () => {
        expect(calculateAriaSortValue(true, "ascending")).toBe("ascending");
      });

      it("should return 'descending' when `isSorted === true && sortedDir === 'descending'`", () => {
        expect(calculateAriaSortValue(true, "descending")).toBe("descending");
      });
    });

    describe("convertRowIdsArrayToObject", () => {
      it("should return empty object if passed empty array", () => {
        const result = convertRowIdsArrayToObject([]);
        expect(result).toEqual({});
      });

      it("should return an object whose length matches input array length", () => {
        const idArr1 = [];
        const idObj1 = convertRowIdsArrayToObject(idArr1);
        expect(Object.keys(idObj1)).toHaveLength(idArr1.length);

        const idArr2 = [1, 2, 3];
        const idObj2 = convertRowIdsArrayToObject(idArr2);
        expect(Object.keys(idObj2)).toHaveLength(idArr2.length);

        const idArr3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const idObj3 = convertRowIdsArrayToObject(idArr3);
        expect(Object.keys(idObj3)).toHaveLength(idArr3.length);
      });

      it("should return an object whose keys (if they exist) are all `true`", () => {
        const idArr1 = [];
        const idObj1 = convertRowIdsArrayToObject(idArr1);
        expect(Object.values(idObj1)).toEqual([]);

        const idArr2 = [1, 2, 3];
        const idObj2 = convertRowIdsArrayToObject(idArr2);
        expect(Object.values(idObj2)).toEqual([true, true, true]);

        const idArr3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const idObj3 = convertRowIdsArrayToObject(idArr3);
        expect(Object.values(idObj3)).toEqual(Array(idArr3.length).fill(true));
      });
    });
  });

  describe("storybook tests", () => {
    describe("CustomActions", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<CustomActions />);
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

    describe("EditableData", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<EditableData />);
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

    describe("SelectableRows", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<SelectableRows />);
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
