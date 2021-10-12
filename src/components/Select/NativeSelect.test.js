import { composeStories } from "@storybook/testing-react";
import * as NativeSelectStories from "./NativeSelect.stories";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { getNativeSelectClassNames } from "./NativeSelect";

const {
  UncontrolledNativeSelect,
  DemoNativeSelect,
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
      renderResult = render(<DemoNativeSelect />);
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
