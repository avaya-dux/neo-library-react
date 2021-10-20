import { composeStories } from "@storybook/testing-react";
import * as NativeSelectStories from "./NativeSelect.stories";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { getNativeSelectClassNames, renderOptions } from "./NativeSelect";
import { listOfStates } from "./SampleData";

const {
  UncontrolledNativeSelect,
  ControlledNativeSelect,
  SelectError,
  SelectRequired,
  SelectDisabled,
} = composeStories(NativeSelectStories);

describe("NativeSelect: ", () => {
  describe("Default", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<UncontrolledNativeSelect />);
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

  describe("Native Select Demo", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<ControlledNativeSelect />);
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

  describe("Native Select Error", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<SelectError />);
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

  describe("Native Select Required", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<SelectRequired />);
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

  describe("Native Select Disabled", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<SelectDisabled />);
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

describe("getNativeSelectClassNames", () => {
  it("given isLoading = true, should return correct css names", () => {
    expect(getNativeSelectClassNames(true)).toMatchInlineSnapshot(
      `"neo-select neo-select__spinner"`
    );
  });
  it("given isLoading = undefined, should return correct css names", () => {
    expect(getNativeSelectClassNames()).toMatchInlineSnapshot(`"neo-select"`);
  });
});

describe("renderOptions", () => {
  it("given options, should return correct options", () => {
    expect(renderOptions(listOfStates)).toMatchInlineSnapshot(`
      Array [
        <option
          disabled={false}
          hidden={true}
          value="0"
        >
          --Please choose an option--
        </option>,
        <option
          value="AL"
        >
          Alabama
        </option>,
        <option
          value="AK"
        >
          Alaska
        </option>,
        <option
          value="AZ"
        >
          Arizona
        </option>,
        <option
          value="AR"
        >
          Arkansas
        </option>,
        <option
          value="CA"
        >
          California
        </option>,
        <option
          value="CO"
        >
          Colorado
        </option>,
        <option
          value="CT"
        >
          Connecticut
        </option>,
        <option
          value="DE"
        >
          Delaware
        </option>,
        <option
          value="FL"
        >
          Florida
        </option>,
        <option
          value="GA"
        >
          Georgia
        </option>,
        <option
          value="HI"
        >
          Hawaii
        </option>,
        <option
          value="ID"
        >
          Idaho
        </option>,
        <option
          value="IL"
        >
          Illinois
        </option>,
        <option
          value="IN"
        >
          Indiana
        </option>,
        <option
          value="IA"
        >
          Iowa
        </option>,
        <option
          value="KS"
        >
          Kansas
        </option>,
        <option
          value="KY"
        >
          Kentucky
        </option>,
        <option
          value="LA"
        >
          Louisiana
        </option>,
        <option
          value="ME"
        >
          Maine
        </option>,
        <option
          value="MD"
        >
          Maryland
        </option>,
        <option
          value="MA"
        >
          Massachusetts
        </option>,
        <option
          value="MI"
        >
          Michigan
        </option>,
        <option
          value="MN"
        >
          Minnesota
        </option>,
        <option
          value="MS"
        >
          Mississippi
        </option>,
        <option
          value="MO"
        >
          Missouri
        </option>,
        <option
          value="MT"
        >
          Montana
        </option>,
        <option
          value="NE"
        >
          Nebraska
        </option>,
        <option
          value="NV"
        >
          Nevada
        </option>,
        <option
          value="NH"
        >
          New Hampshire
        </option>,
        <option
          value="NJ"
        >
          New Jersey
        </option>,
        <option
          value="NM"
        >
          New Mexico
        </option>,
        <option
          value="NY"
        >
          New York
        </option>,
        <option
          value="NC"
        >
          North Carolina
        </option>,
        <option
          value="ND"
        >
          North Dakota
        </option>,
        <option
          value="OH"
        >
          Ohio
        </option>,
        <option
          value="OK"
        >
          Oklahoma
        </option>,
        <option
          value="OR"
        >
          Oregon
        </option>,
        <option
          value="PA"
        >
          Pennsylvania
        </option>,
        <option
          value="RI"
        >
          Rhode Island
        </option>,
        <option
          value="SC"
        >
          South Carolina
        </option>,
        <option
          value="SD"
        >
          South Dakota
        </option>,
        <option
          value="TN"
        >
          Tennessee
        </option>,
        <option
          value="TX"
        >
          Texas
        </option>,
        <option
          value="UT"
        >
          Utah
        </option>,
        <option
          value="VT"
        >
          Vermont
        </option>,
        <option
          value="VA"
        >
          Virginia
        </option>,
        <option
          value="WA"
        >
          Washington
        </option>,
        <option
          value="WV"
        >
          West Virginia
        </option>,
        <option
          value="WI"
        >
          Wisconsin
        </option>,
        <option
          value="WY"
        >
          Wyoming
        </option>,
      ]
    `);
  });
});
