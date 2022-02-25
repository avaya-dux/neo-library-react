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

  it("uses an `<a>` when _not_ disabled", () => {
    const { container } = render(
      <ul>
        <LinkItem>{linkItemText}</LinkItem>
      </ul>
    );

    const linkElement = container.querySelector("a");
    const buttonElement = container.querySelector("button");
    expect(linkElement).toBeInTheDocument();
    expect(buttonElement).not.toBeInTheDocument();
  });

  it("uses an `<button>` when it _is_ disabled", () => {
    const { container } = render(
      <ul>
        <LinkItem disabled>{linkItemText}</LinkItem>
      </ul>
    );

    const linkElement = container.querySelector("a");
    const buttonElement = container.querySelector("button");
    expect(linkElement).not.toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
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
