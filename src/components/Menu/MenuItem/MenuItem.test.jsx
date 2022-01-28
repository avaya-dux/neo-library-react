import { composeStories } from "@storybook/testing-react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import log from "loglevel";

import * as MenuItemStories from "./MenuItem.stories";

log.disableAll();

const { Default } = composeStories(MenuItemStories);

describe("Storybook tests", () => {
  let renderResult;
  beforeEach(() => {
    renderResult = render(<Default />);
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
