import {
  getOptionClassNames,
  renderMultipleOptions,
  renderSingleOptions,
} from "./Options";
import { listOfStates } from "./SampleData";

describe("getOptionClassNames", () => {
  it("default return", () => {
    expect(getOptionClassNames()).toMatchInlineSnapshot(`"neo-input-group"`);
  });
  it("given isHover = true, should return correct css names", () => {
    expect(getOptionClassNames(true)).toMatchInlineSnapshot(
      `"neo-input-group neo-multiselect__content__item--hover"`
    );
  });

  it("given isHover = true, disabled= true should return correct css names", () => {
    expect(getOptionClassNames(true, true)).toMatchInlineSnapshot(
      `"neo-input-group neo-multiselect__content__item--hover neo-multiselect__content__item--disabled"`
    );
  });

  it("given isHover = true, disabled= true, isActive true, should return correct css names", () => {
    expect(getOptionClassNames(true, true, true)).toMatchInlineSnapshot(
      `"neo-input-group neo-multiselect__content__item--hover neo-multiselect__content__item--disabled neo-multiselect__content__item--focus"`
    );
  });
});

describe("renderSingleOptions and renderMultipleOptions", () => {
  it("renderSingleOptions given a listOfStates and cursor 1, should return a list", () => {
    expect(renderSingleOptions(listOfStates.slice(0, 4), 1))
      .toMatchInlineSnapshot(`
      Array [
        null,
        <div
          aria-selected={true}
          className="neo-input-group neo-multiselect__content__item--hover"
          data-value="AL"
          role="option"
        >
          Alabama
        </div>,
        <div
          aria-selected={false}
          className="neo-input-group"
          data-value="AK"
          role="option"
        >
          Alaska
        </div>,
        <div
          aria-selected={false}
          className="neo-input-group"
          data-value="AZ"
          role="option"
        >
          Arizona
        </div>,
      ]
    `);
  });

  it("renderMultipleOptions given a listOfStates and cursor 1, should return a list", () => {
    expect(
      renderMultipleOptions(
        listOfStates.slice(0, 3),
        listOfStates.slice(0, 1),
        1,
        () => console.log("test")
      )
    ).toMatchInlineSnapshot(`
      Array [
        null,
        <div
          className="neo-input-group neo-multiselect__content__item--hover"
          role="listitem"
        >
          <input
            aria-describedby="Alabama-hint-1"
            checked={false}
            className="neo-check"
            id="Alabama-checkbox-1"
            onChange={[Function]}
            onMouseEnter={[Function]}
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
          role="listitem"
        >
          <input
            aria-describedby="Alaska-hint-2"
            checked={false}
            className="neo-check"
            id="Alaska-checkbox-2"
            onChange={[Function]}
            onMouseEnter={[Function]}
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
