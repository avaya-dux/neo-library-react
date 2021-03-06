import { composeStories } from "@storybook/testing-react";
import { fireEvent, render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { TopLinkItem } from "./TopLinkItem";
import { LeftNavigation } from "../LeftNavigation";
import * as TopLinkItemStories from "./TopLinkItem.stories";

const { Default } = composeStories(TopLinkItemStories);

describe("TopLinkItem", () => {
  const TopLinkItemLabel = "label for top link";

  it("fully renders without exploding", () => {
    const { getByText } = render(<TopLinkItem label={TopLinkItemLabel} />);
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

  it("assigns the appropriate class name when the `active` prop is passed", () => {
    render(<TopLinkItem label={TopLinkItemLabel} active />);
    const linkElement = screen.getByRole("listitem");
    expect(linkElement).toHaveClass("neo-leftnav__main--active");
  });

  it("assigns the appropriate class name when `icon` prop is passed with `active` prop", () => {
    render(
      <TopLinkItem
        label={TopLinkItemLabel}
        active
        icon="address-book"
        href="#"
      />
    );
    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveClass("neo-icon-address-book");
  });

  it("assigns the appropriate class name when `icon` prop is passed without `active` prop", () => {
    render(
      <TopLinkItem label={TopLinkItemLabel} icon="address-book" href="#" />
    );
    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveClass("neo-icon-address-book");
  });

  it("should simulate onclick function when not disabled", () => {
    const mockedFunction = jest.fn();
    const { getByText } = render(
      <LeftNavigation
        aria-label="Main Navigation"
        onNavigate={mockedFunction}
        currentUrl=""
      >
        <TopLinkItem label={TopLinkItemLabel} />
      </LeftNavigation>
    );
    const linkElement = getByText(TopLinkItemLabel);
    fireEvent.click(linkElement);
    expect(mockedFunction).toHaveBeenCalled();
  });

  it("uses a `<button>` when it _is_ disabled", () => {
    const { container } = render(
      <TopLinkItem label={TopLinkItemLabel} disabled />
    );
    const linkElement = container.querySelector("a");
    const buttonElement = container.querySelector("button");
    expect(linkElement).not.toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it("should not simulate onclick function for disable link", () => {
    const mockedFunction = jest.fn();
    const { getByText } = render(
      <TopLinkItem onClick={mockedFunction} label={TopLinkItemLabel} disabled />
    );
    const linkElement = getByText(TopLinkItemLabel);
    fireEvent.click(linkElement);
    expect(mockedFunction).not.toHaveBeenCalled();
  });

  describe("storybook tests", () => {
    describe("Top LinkItem", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<Default />);
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
