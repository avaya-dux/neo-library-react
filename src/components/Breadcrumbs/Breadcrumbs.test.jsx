import { render } from "@testing-library/react";
import { Breadcrumbs } from "./Breadcrumbs";
import "@testing-library/jest-dom";
import { axe, toHaveNoViolations } from "jest-axe";

import { composeStories } from "@storybook/testing-react";

import * as BreadcrumbsStories from "./Breadcrumbs.stories";

expect.extend(toHaveNoViolations);

describe("Breadcrumbs: ", () => {
  describe("given just current page link: ", () => {
    const currentPageLink = { href: "root", text: "root" };
    const props = {
      currentPageLink,
    };
    let renderResult;
    beforeEach(() => {
      renderResult = render(<Breadcrumbs {...props} />);
    });

    it("passes basic axe compliance", async () => {
      await axeTest(renderResult);
    });

    it("renders ok", () => {
      const { getByTestId } = renderResult;
      const rootElement = getByTestId("Breadcrumbs-root");
      expect(rootElement).toBeTruthy();
    });

    it("style of current page link has current", () => {
      const { getByRole } = renderResult;
      const currentPageByRole = getByRole("listitem");
      expect(currentPageByRole).toHaveClass("neo-breadcrumbs__link--current");
    });

    it("style of current page link has link", () => {
      const { getByRole } = renderResult;
      const currentPageByRole = getByRole("listitem");
      expect(currentPageByRole).toHaveClass("neo-breadcrumbs__link");
    });

    it("description is not rendered", () => {
      const { container } = renderResult;
      const description = container.querySelector(
        ".neo-breadcrumbs__description"
      );
      expect(description).toBeNull();
    });
  });

  describe("given one parent link and current page link and description: ", () => {
    const currentPageLink = { href: "#current", text: "Current Page" };
    const links = [{ href: "#parent1", text: "parent1" }];

    const props = {
      links,
      currentPageLink,
      description: "Breadcrumb Example page description",
    };
    let renderResult;
    beforeEach(() => {
      renderResult = render(<Breadcrumbs {...props} />);
    });

    it("passes basic axe compliance", async () => {
      await axeTest(renderResult);
    });

    it("it renders ok", () => {
      const { getByTestId } = renderResult;
      const rootElement = getByTestId("Breadcrumbs-root");
      expect(rootElement).toBeTruthy();
    });

    it("it renders two links", () => {
      const { getAllByRole } = renderResult;
      const allListItems = getAllByRole("listitem");
      expect(allListItems).toHaveLength(2);
    });

    it("it renders page description", () => {
      const { getByText } = renderResult;
      const descriptionElement = getByText(props.description);
      expect(descriptionElement).toBeTruthy();
    });

    it("current link has correct text and aria-current", () => {
      const { getAllByRole } = renderResult;
      const currentPageByRole = getAllByRole("link")[1];
      expect(currentPageByRole).toHaveTextContent("Current Page");
      expect(currentPageByRole).toHaveAttribute("aria-current", "page");
    });
  });

  describe("CurrentPageOnly story: ", () => {
    const { CurrentPageOnly } = composeStories(BreadcrumbsStories);
    let renderResult;

    beforeEach(() => {
      renderResult = render(<CurrentPageOnly />);
    });

    it("renders ok", () => {
      const { container } = renderResult;
      expect(container).not.toBe(null);
    });
  });

  describe("HavingOneLink story: ", () => {
    const { HavingOneLink } = composeStories(BreadcrumbsStories);
    let renderResult;

    beforeEach(() => {
      renderResult = render(<HavingOneLink />);
    });

    it("renders ok", () => {
      const { container } = renderResult;
      expect(container).not.toBe(null);
    });
  });

  describe("HavingTwoLinks story: ", () => {
    const { HavingTwoLinks } = composeStories(BreadcrumbsStories);
    let renderResult;

    beforeEach(() => {
      renderResult = render(<HavingTwoLinks />);
    });

    it("renders ok", () => {
      const { container } = renderResult;
      expect(container).not.toBe(null);
    });

    it("it renders three links", () => {
      const { getAllByRole } = renderResult;
      const allListItems = getAllByRole("listitem");
      expect(allListItems).toHaveLength(3);
    });
  });
});
async function axeTest(renderResult) {
  const { container } = renderResult;
  const results = await axe(container);
  expect(results).toHaveNoViolations();
}
