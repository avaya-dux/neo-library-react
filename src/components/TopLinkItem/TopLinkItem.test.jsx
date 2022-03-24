import { composeStories } from "@storybook/testing-react";
import { fireEvent, render } from "@testing-library/react";
import { axe } from "jest-axe";
import { TopLinkItem } from "./TopLinkItem";
import * as TopLinkItemStories from "./TopLinkItem.stories";

const { TopLinkItemStory } = composeStories(TopLinkItemStories);

describe("TopLinkItem", () => {
  const TopLinkItemLabel = "label for top link";

  it("fully renders without exploding", () => {
    const { getByText } = render(
      <ul>
        <TopLinkItem label={TopLinkItemLabel} />
      </ul>
    );
    const topLinkElement = getByText(TopLinkItemLabel);
    expect(topLinkElement).toBeInTheDocument();
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(
      <ul>
        <TopLinkItem label={TopLinkItemLabel} />
      </ul>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("active state of top link item", () => {
    const { container } = render(
      <ul>
        <TopLinkItem label={TopLinkItemLabel} active />
      </ul>
    );
    const linkElement = container.querySelector(".neo-leftnav__main--active");
    expect(linkElement).toBeInTheDocument();
  });

  it("active state of top link item with icon", () => {
    const { container } = render(
      <ul>
        <TopLinkItem
          label={TopLinkItemLabel}
          active
          icon="address-book"
        />
      </ul>
    );
    const linkElement = container.querySelector(".neo-icon-address-book");
    expect(linkElement).toBeInTheDocument();
  });

  it("normal state of top link item with icon", () => {
    const { container } = render(
      <ul>
        <TopLinkItem label={TopLinkItemLabel}  icon="address-book" />
      </ul>
    );
    const linkElement = container.querySelector(".neo-icon-address-book");
    expect(linkElement).toBeInTheDocument();
  });

  it("should simulate onclick function", () => {
    const mockedFunction = jest.fn();
    const { getByText } = render(
      <ul>
        <TopLinkItem onClick={mockedFunction} label={TopLinkItemLabel} />
      </ul>
    );
    const linkElement = getByText(TopLinkItemLabel);
    fireEvent.click(linkElement);
    expect(mockedFunction).toHaveBeenCalled();
  });

  describe("storybook tests", () => {
    describe("Top LinkItem", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<TopLinkItemStory />);
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
