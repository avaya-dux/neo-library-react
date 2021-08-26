import { render, RenderResult } from "@testing-library/react";
import { Breadcrumbs } from "./BreadcrumbsComponent";
import "@testing-library/jest-dom";
describe("Breadcrumbs: ", () => {
  describe("given just current page link: ", () => {
    const currentPageLink = { href: "root", text: "root" };
    const props = {
      currentPageLink,
      description: "Breadcrumb Example page description",
    };
    let renderResult;
    beforeEach(() => {
      renderResult = render(<Breadcrumbs {...props} />);
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
  });

  describe("given one parent link and current page link: ", () => {
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
});
