import { composeStories } from "@storybook/testing-react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { Pagination } from ".";
import * as PaginationStories from "./Pagination.stories";

const { Default, Templated } = composeStories(PaginationStories);

describe("Pagination", () => {
  const defaultProps = {
    currentPageIndex: 1,
    itemCount: 10,
    itemsPerPage: 1,
    itemsPerPageOptions: [1, 5, 10],
    onPageChange: () => {},
    onItemsPerPageChange: () => {},
  };

  it("fully renders without exploding", () => {
    jest.spyOn(console, "warn").mockImplementation(() => {});
    const { getByRole, getAllByRole } = render(
      <Pagination {...defaultProps} />
    );

    const innerNavElement = getByRole("navigation");
    const tooltips = getAllByRole("tooltip");
    expect(innerNavElement).toBeTruthy();
    expect(tooltips).toHaveLength(2);
  });

  it("does not render the `<select>` if no options are passed for it", () => {
    jest.spyOn(console, "warn").mockImplementation(() => {});

    const props = {
      ...defaultProps,
      itemsPerPageOptions: undefined,
    };
    const { getByRole, getAllByRole } = render(<Pagination {...props} />);

    const innerNavElement = getByRole("navigation");
    const tooltips = getAllByRole("tooltip");
    expect(innerNavElement).toBeTruthy();
    expect(tooltips).toHaveLength(1);
  });

  it("shows a single, disabled, nav item when `totalPages <= 1`", () => {
    jest.spyOn(console, "warn").mockImplementation(() => {});

    const props = {
      ...defaultProps,
      itemCount: 10,
      itemsPerPage: 10,
    };
    const { queryAllByRole } = render(<Pagination {...props} />);

    const innerNavElement = queryAllByRole("navigation");
    expect(innerNavElement).toHaveLength(1);

    const navItems = queryAllByRole("button");
    expect(navItems).toHaveLength(3); // left, 1, right
    navItems.forEach((navItem) => {
      expect(navItem).toBeDisabled();
    });
  });

  // TODO-565: more tests
  // it("shows just two numbers in the nav when the container is small", () => {});
  // it("shows just four numbers in the nav when the container is large", () => {});
  // it("matches it's previous snapshot", () => {
  //   const { container } = render(<Pagination {...defaultProps} />);
  //   expect(container).toMatchInlineSnapshot();
  // });

  it("passes basic axe compliance", async () => {
    const { container } = render(<Pagination {...defaultProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  describe("storybook tests", () => {
    describe("Default", () => {
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

    describe("Templated", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<Templated />);
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

  // TODO-565: more tests
  // describe("helpers", () => {});
});
