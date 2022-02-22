import { composeStories } from "@storybook/testing-react";
import { render } from "@testing-library/react";
import * as LinkItemStories from "./LinkItem.stories";

console.log("test file", LinkItemStories);
describe("LinkItem: ", () => {
  describe("Render Simple LinkItems", () => {
    const { SimpleLink } = composeStories(LinkItemStories);
    let renderResult;
    beforeEach(() => {
      renderResult = render(<SimpleLink />);
    });

    it("render LinkItems", () => {
      const { Item } = renderResult;
      expect(Item).not.toBe(null);
    });
  });


  describe("Render Active LinkItems", () => {
    const { ActiveLink } = composeStories(LinkItemStories);
    let renderResult;
    beforeEach(() => {
      renderResult = render(<ActiveLink />);
    });

    it("render LinkItems", () => {
      const { Item } = renderResult;
      expect(Item).not.toBe(null);
    });
  });


  describe("Render Disabled LinkItems", () => {
    const { DisabledLink } = composeStories(LinkItemStories);
    let renderResult;
    beforeEach(() => {
      renderResult = render(<DisabledLink />);
    });

    it("render LinkItems", () => {
      const { Item } = renderResult;
      expect(Item).not.toBe(null);
    });
  });
});


