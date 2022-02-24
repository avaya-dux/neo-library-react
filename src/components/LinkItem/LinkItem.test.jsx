import { composeStories } from "@storybook/testing-react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import * as LinkItemStories from "./LinkItem.stories";

const { LinkItems } = composeStories(LinkItemStories);

describe("LinkItem: ", () => {
  describe("Render LinkItems", () => {
    it("render LinkItems without any problem", () => {
      const { Item } = render(<LinkItems />);
      expect(Item).not.toBe(null);
    });
    it("passes basic axe compliance", async () => {
      const { container } = render(<LinkItems />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
