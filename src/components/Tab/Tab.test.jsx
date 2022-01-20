import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import * as TabStories from "./Tab.stories";

import { getHeadClasses, Tab } from "./Tab";

const { BasicTab } = composeStories(TabStories);
describe("Tab", () => {
  describe("Storybook tests", () => {
    describe(BasicTab, () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<BasicTab />);
      });
      it("should render ok", () => {
        const { container } = renderResult;
        expect(container).toBeDefined();
      });

      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });
  });
});
describe(getHeadClasses, () => {
  it("when active = true and disabled = true, class is returned", () => {
    const result = getHeadClasses({ active: true, disabled: true });
    expect(result).toContain("neo-tabs__item--active-disabled");
    expect(result).toContain("neo-tabs__item");
  });
  it("when active = true and disabled = false, class is returned", () => {
    const result = getHeadClasses({ active: true, disabled: false });
    expect(result).toContain("neo-tabs__item--active");
    expect(result).toContain("neo-tabs__item");
  });
  it("when active = false and disabled = true, class is returned", () => {
    const result = getHeadClasses({ active: false, disabled: true });
    expect(result).toContain("neo-tabs__item--disabled");
    expect(result).toContain("neo-tabs__item");
  });
  it("when active = false and disabled = false, class is returned", () => {
    const result = getHeadClasses({ active: false, disabled: false });
    expect(result).toContain("neo-tabs__item");
  });
});
