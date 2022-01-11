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
    const { getByLabelText, getByText } = render(
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
    const headerCheckboxLabel = getByText(
      FilledFields.translations.header.selectAll
    ).closest("label");
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

  it("properly selects and deselects a body row", () => {
    const { queryAllByRole } = render(
      <Table {...FilledFields} selectableRows="multiple" />
    );

    const alltrs = queryAllByRole("row");
    expect(alltrs.length).toBeTruthy();

    const firstBodyRow = alltrs[1];
    expect(firstBodyRow.classList.length).toBe(0);
    expect(firstBodyRow).not.toHaveClass("active");

    const firstRowCheckbox = firstBodyRow.querySelector("input");
    expect(firstRowCheckbox.checked).toBeFalsy();

    const firstRowCheckboxLabel = firstBodyRow.querySelector("label");
    fireEvent.click(firstRowCheckboxLabel);

    expect(firstRowCheckbox.checked).toBeTruthy();
    expect(firstBodyRow.classList.length).toBe(1);
    expect(firstBodyRow).toHaveClass("active");

    fireEvent.click(firstRowCheckboxLabel);

    expect(firstRowCheckbox.checked).toBeFalsy();
    expect(firstBodyRow.classList.length).toBe(0);
    expect(firstBodyRow).not.toHaveClass("active");
  });

  describe("toolbar functionality", () => {
    it("properly calls it's `create` method", () => {
      const mock = jest.fn();
      const { getByText, queryAllByRole } = render(
        <Table {...FilledFields} handleCreate={mock} selectableRows="single" />
      );

      const createButton = getByText(FilledFields.translations.toolbar.create);

      fireEvent.click(createButton);
      expect(mock).toHaveBeenCalled();

      mock.mockClear();
      expect(mock).not.toHaveBeenCalled();

      const firstRowCheckboxLabel =
        queryAllByRole("row")[1].querySelector("label");
      fireEvent.click(firstRowCheckboxLabel);

      fireEvent.click(createButton);
      expect(mock).not.toHaveBeenCalled();
    });

    it("properly calls it's `edit` method", () => {
      const mock = jest.fn();
      const { getByText, queryAllByRole } = render(
        <Table
          {...FilledFields}
          handleEdit={mock}
          itemsPerPageOptions={[50]}
          selectableRows="multiple"
        />
      );

      const editButton = getByText(FilledFields.translations.toolbar.edit);

      fireEvent.click(editButton);
      expect(mock).not.toHaveBeenCalled();

      // select first two body rows
      const firstRowCheckboxLabel =
        queryAllByRole("row")[1].querySelector("label");
      const secondRowCheckboxLabel =
        queryAllByRole("row")[2].querySelector("label");
      fireEvent.click(firstRowCheckboxLabel);
      fireEvent.click(secondRowCheckboxLabel);

      // `edit` button should be disabled, and thus not called
      fireEvent.click(editButton);
      expect(mock).not.toHaveBeenCalled();

      // deselect first row
      fireEvent.click(firstRowCheckboxLabel);

      // `edit` button should be enabled, and thus callable
      fireEvent.click(editButton);
      expect(mock).toHaveBeenCalled();
    });

    it("properly calls it's `delete` method", () => {
      const mock = jest.fn();
      const { getByText, queryAllByRole } = render(
        <Table
          {...FilledFields}
          handleDelete={mock}
          itemsPerPageOptions={[50]}
          selectableRows="multiple"
        />
      );

      const deleteButton = getByText(FilledFields.translations.toolbar.delete);

      // not callable when zero rows are selected
      fireEvent.click(deleteButton);
      expect(mock).not.toHaveBeenCalled();

      const firstRowCheckboxLabel =
        queryAllByRole("row")[1].querySelector("label");
      fireEvent.click(firstRowCheckboxLabel);

      // callable when one row is selected
      fireEvent.click(deleteButton);
      expect(mock).toHaveBeenCalledTimes(1);

      const secondRowCheckboxLabel =
        queryAllByRole("row")[2].querySelector("label");
      fireEvent.click(secondRowCheckboxLabel);

      // callable when multiple rows are selected
      fireEvent.click(deleteButton);
      expect(mock).toHaveBeenCalledTimes(2);
    });

    it("properly utilizes it's `search` method", () => {
      const { getByLabelText, queryAllByRole } = render(
        <Table {...FilledFields} itemsPerPageOptions={[50]} />
      );

      const alltrs = queryAllByRole("row");
      expect(alltrs).toHaveLength(FilledFields.data.length + 1);

      const searchInput = getByLabelText(
        FilledFields.translations.toolbar.searchInputPlaceholder
      );
      fireEvent.change(searchInput, {
        target: { value: FilledFields.data[0].label },
      });

      const filteredtrs = queryAllByRole("row");
      expect(filteredtrs).toHaveLength(2);
    });
  });

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
