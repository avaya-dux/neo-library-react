import { listOfStates } from "components/Select/SampleData";
import { getOptionClassNames, renderSelectOptions } from "./Options";

describe("Options test", () => {
  describe(getOptionClassNames, () => {
    it("Should return `neo-input-group` when no props are passed", () => {
      expect(getOptionClassNames()).toMatchInlineSnapshot(`"neo-input-group"`);
    });
    it("Should return correct css names when `isHover = true`", () => {
      expect(getOptionClassNames(true)).toMatchInlineSnapshot(
        `"neo-input-group neo-multiselect__content__item--hover"`
      );
    });

    it("Should return correct css names when `isHover = true` and `isDisabled = true`", () => {
      expect(getOptionClassNames(true, true)).toMatchInlineSnapshot(
        `"neo-input-group neo-multiselect__content__item--hover neo-multiselect__content__item--disabled"`
      );
    });

    it("Should return correct css names when `isHover = true`, `isDisabled = true` and `isActive = true`", () => {
      expect(getOptionClassNames(true, true, true)).toMatchInlineSnapshot(
        `"neo-input-group neo-multiselect__content__item--hover neo-multiselect__content__item--disabled neo-multiselect__content__item--focus"`
      );
    });
  });

  describe(renderSelectOptions, () => {
    it("Should return an empty array when `options = [], selectedOptions = [], cursor = 0 and isMultiple = false`", () => {
      expect(
        renderSelectOptions([], [], 0, () => null, false)
      ).toMatchInlineSnapshot(`Array []`);
    });

    it("Should return an array of <div>s if there is an item in the list with the `placeholder = true`, null will be returned for that item, when `options = OptionType[]`, `cursor = 0` and `isMultiple = false`", () => {
      expect(
        renderSelectOptions(
          listOfStates.slice(0, 4),
          listOfStates.slice(0, 1),
          0,
          () => null,
          false
        )
      ).toMatchInlineSnapshot(`
        Array [
          null,
          <div
            aria-selected={false}
            className="neo-input-group"
            data-value="AL"
            id="Alabama-AL"
            onMouseEnter={[Function]}
            role="option"
            tabIndex={0}
          >
            Alabama
          </div>,
          <div
            aria-selected={false}
            className="neo-input-group"
            data-value="AK"
            id="Alaska-AK"
            onMouseEnter={[Function]}
            role="option"
            tabIndex={0}
          >
            Alaska
          </div>,
          <div
            aria-selected={false}
            className="neo-input-group"
            data-value="AZ"
            id="Arizona-AZ"
            onMouseEnter={[Function]}
            role="option"
            tabIndex={0}
          >
            Arizona
          </div>,
        ]
      `);
    });

    it("Should return an array of <div>s if there is an item in the list with the `placeholder = true`, null will be returned for that item, also the item with the index 1 will have the class `--hover` when `options = OptionType[]`, `cursor = 1` and `isMultiple = false`", () => {
      expect(
        renderSelectOptions(
          listOfStates.slice(0, 4),
          listOfStates.slice(0, 1),
          1,
          () => null,
          false
        )
      ).toMatchInlineSnapshot(`
        Array [
          null,
          <div
            aria-selected={true}
            className="neo-input-group neo-multiselect__content__item--hover"
            data-value="AL"
            id="Alabama-AL"
            onMouseEnter={[Function]}
            role="option"
            tabIndex={0}
          >
            Alabama
          </div>,
          <div
            aria-selected={false}
            className="neo-input-group"
            data-value="AK"
            id="Alaska-AK"
            onMouseEnter={[Function]}
            role="option"
            tabIndex={0}
          >
            Alaska
          </div>,
          <div
            aria-selected={false}
            className="neo-input-group"
            data-value="AZ"
            id="Arizona-AZ"
            onMouseEnter={[Function]}
            role="option"
            tabIndex={0}
          >
            Arizona
          </div>,
        ]
      `);
    });

    it("Should return an array of <div>s if there is an item in the list with the `placeholder = true`, null will be returned for that item, when `options = OptionType[]`, `selectedItems = OptionType[]`, `cursor = 0` and `isMultiple = true`", () => {
      expect(
        renderSelectOptions(
          listOfStates.slice(0, 3),
          listOfStates.slice(0, 1),
          0,
          () => null,
          true
        )
      ).toMatchInlineSnapshot(`
        Array [
          null,
          <div
            className="neo-input-group"
            id="Alabama-AL"
            role="listitem"
          >
            <input
              aria-describedby="Alabama-hint-1"
              checked={false}
              className="neo-check"
              id="Alabama-checkbox-1"
              onMouseEnter={[Function]}
              readOnly={true}
              tabIndex={-1}
              type="checkbox"
              value="AL"
            />
            <label
              data-value="AL"
              htmlFor="Alabama-checkbox-1"
            >
              Alabama
            </label>
          </div>,
          <div
            className="neo-input-group"
            id="Alaska-AK"
            role="listitem"
          >
            <input
              aria-describedby="Alaska-hint-2"
              checked={false}
              className="neo-check"
              id="Alaska-checkbox-2"
              onMouseEnter={[Function]}
              readOnly={true}
              tabIndex={-1}
              type="checkbox"
              value="AK"
            />
            <label
              data-value="AK"
              htmlFor="Alaska-checkbox-2"
            >
              Alaska
            </label>
          </div>,
        ]
      `);
    });

    it("Should return an array of <div>s if there is an item in the list with the `placeholder = true`, null will be returned for that item, also the item with the index 1 will have the class `--hover`, when `options = OptionType[]`, `selectedItems = OptionType[]`, `cursor = 1` and `isMultiple = true`", () => {
      expect(
        renderSelectOptions(
          listOfStates.slice(0, 3),
          listOfStates.slice(0, 1),
          1,
          () => null,
          true
        )
      ).toMatchInlineSnapshot(`
        Array [
          null,
          <div
            className="neo-input-group neo-multiselect__content__item--hover"
            id="Alabama-AL"
            role="listitem"
          >
            <input
              aria-describedby="Alabama-hint-1"
              checked={false}
              className="neo-check"
              id="Alabama-checkbox-1"
              onMouseEnter={[Function]}
              readOnly={true}
              tabIndex={-1}
              type="checkbox"
              value="AL"
            />
            <label
              data-value="AL"
              htmlFor="Alabama-checkbox-1"
            >
              Alabama
            </label>
          </div>,
          <div
            className="neo-input-group"
            id="Alaska-AK"
            role="listitem"
          >
            <input
              aria-describedby="Alaska-hint-2"
              checked={false}
              className="neo-check"
              id="Alaska-checkbox-2"
              onMouseEnter={[Function]}
              readOnly={true}
              tabIndex={-1}
              type="checkbox"
              value="AK"
            />
            <label
              data-value="AK"
              htmlFor="Alaska-checkbox-2"
            >
              Alaska
            </label>
          </div>,
        ]
      `);
    });
  });
});
