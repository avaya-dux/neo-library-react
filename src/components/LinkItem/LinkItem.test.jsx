import { composeStories } from "@storybook/testing-react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { LinkItem } from "./LinkItem";
import * as LinkItemStories from "./LinkItem.stories";

const { LinkItems } = composeStories(LinkItemStories);

describe("LinkItem", () => {
  const linkItemText = "example link item";

  it("fully renders without exploding", () => {
    const { getByText } = render(
      <ul>
        <LinkItem>{linkItemText}</LinkItem>
      </ul>
    );

    const linkElement = getByText(linkItemText);
    expect(linkElement).toBeInTheDocument();
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(
      <ul>
        <LinkItem>{linkItemText}</LinkItem>
      </ul>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  describe("storybook tests", () => {
    describe("LinkItems", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<LinkItems />);
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
