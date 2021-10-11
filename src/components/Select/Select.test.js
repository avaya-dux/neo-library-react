import { composeStories } from "@storybook/testing-react";
import * as SelectStories from "./Select.stories";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { getComponentClassNames } from "./Select";

const {
  DefaultSelect,
  DemoSelect,
  DemoMultipleSelect,
  SelectError,
  SelectRequired,
  SelectDisabled,
} = composeStories(SelectStories);

describe("Select: ", () => {
  describe("Default", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<DefaultSelect />);
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

  describe("DemoSelect", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<DemoSelect />);
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

  describe("DemoMultipleSelect", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<DemoMultipleSelect />);
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

  describe("SelectError", () => {
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

  describe("SelectRequired", () => {
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

  describe("SelectDisabled", () => {
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

describe("getComponentClassNames", () => {
  it("given isOpen = true, should return correct css names", () => {
    expect(getComponentClassNames(true)).toMatchInlineSnapshot(
      `"neo-multiselect neo-multiselect--active"`
    );
  });
  it("given isOpen = false, should return correct css names", () => {
    expect(getComponentClassNames()).toMatchInlineSnapshot(`"neo-multiselect"`);
  });

  it("given isOpen = true, disabled= true should return correct css names", () => {
    expect(getComponentClassNames(true, true)).toMatchInlineSnapshot(
      `"neo-multiselect neo-multiselect--active neo-multiselect--disabled"`
    );
  });

  it("given isOpen = true, disabled= true, isLoading= true, should return correct css names", () => {
    expect(getComponentClassNames(true, true, true)).toMatchInlineSnapshot(
      `"neo-multiselect neo-multiselect--active neo-multiselect--disabled neo-select__spinner"`
    );
  });
});
