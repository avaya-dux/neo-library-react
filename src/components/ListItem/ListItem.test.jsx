import { composeStories } from "@storybook/testing-react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";

// import { Avatar, Icon, IconButton, Switch } from "components";

// import { ListItem } from "./ListItem";
import * as ListItemStories from "./ListItem.stories";

describe("ListItem: ", () => {
  describe("Render Portal Spaces UI Examples Story", () => {
    const { PortalListItemExamples } = composeStories(ListItemStories);
    let renderResult;

    beforeEach(() => {
      renderResult = render(<PortalListItemExamples />);
    });

    it("renders ok", () => {
      const { container } = renderResult;
      expect(container).not.toBe(null);
    });
  });

  describe("Render Portal Default Neo UI Story ", () => {
    const { PortalListSectionsExamples } = composeStories(ListItemStories);
    let renderResult;

    beforeEach(() => {
      renderResult = render(<PortalListSectionsExamples />);
    });

    it("renders ok", () => {
      const { container } = renderResult;
      expect(container).not.toBe(null);
    });
  });

  describe("Render ListItems: Text Only", () => {
    const { TextOnly } = composeStories(ListItemStories);
    let renderResult;

    beforeEach(() => {
      renderResult = render(<TextOnly />);
    });

    it("renders ok", () => {
      const { container } = renderResult;
      expect(container).not.toBe(null);
    });

    it("passes basic axe compliance", async () => {
      await axeTest(renderResult);
    });
  });

  describe("Render ListItems: Text with Hover", () => {
    const { TextOnlyWithHover } = composeStories(ListItemStories);
    let renderResult;

    beforeEach(() => {
      renderResult = render(<TextOnlyWithHover />);
    });

    it("renders ok", () => {
      const { container } = renderResult;
      expect(container).not.toBe(null);
    });

    it("passes basic axe compliance", async () => {
      await axeTest(renderResult);
    });
  });

  describe("Render ListItems: Text with Icon and Hover", () => {
    const { TextWithIconAndHover } = composeStories(ListItemStories);
    let renderResult;

    beforeEach(() => {
      renderResult = render(<TextWithIconAndHover />);
    });

    it("renders ok", () => {
      const { container } = renderResult;
      expect(container).not.toBe(null);
    });

    it("passes basic axe compliance", async () => {
      await axeTest(renderResult);
    });
  });

  describe("Render ListItems: Text with Icon and Hover and Switch", () => {
    const { TextWithIconAndHoverAndSwitch } = composeStories(ListItemStories);
    let renderResult;

    beforeEach(() => {
      renderResult = render(<TextWithIconAndHoverAndSwitch />);
    });

    it("renders ok", () => {
      const { container } = renderResult;
      expect(container).not.toBe(null);
    });

    it("passes basic axe compliance", async () => {
      await axeTest(renderResult);
    });
  });

  describe("Render ListItems: Text with Icon and Hover and IconButton", () => {
    const { TextWithIconAndHoverAndIconButton } =
      composeStories(ListItemStories);
    let renderResult;

    beforeEach(() => {
      renderResult = render(<TextWithIconAndHoverAndIconButton />);
    });

    it("renders ok", () => {
      const { container } = renderResult;
      expect(container).not.toBe(null);
    });

    it("passes basic axe compliance", async () => {
      await axeTest(renderResult);
    });
  });
});

async function axeTest(renderResult) {
  const { container } = renderResult;
  const results = await axe(container);
  expect(results).toHaveNoViolations();
}
