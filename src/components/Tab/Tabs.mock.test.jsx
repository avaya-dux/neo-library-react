import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as CarouselTabStories from "./Tabs.carousel.stories";
import { enableLeftButton, enableRightButton } from "./EventHandlers/Helper";
import {
  handleLeftCarouselMouseClickEvent,
  handleRightCarouselMouseClickEvent,
} from "./EventHandlers";
jest.mock("./EventHandlers");
jest.mock("./EventHandlers/Helper");
const { ManyTabsCarousel } = composeStories(CarouselTabStories);

describe("Tabs", () => {
  describe("Storybook tests", () => {
    describe(ManyTabsCarousel.storyName, () => {
      let renderResult;
      beforeEach(() => {
        enableLeftButton.mockReturnValue(true);
        enableRightButton.mockReturnValue(true);
        renderResult = render(<ManyTabsCarousel />);
      });
      afterEach(() => {
        jest.resetAllMocks();
      });
      it("click right carousel button once, it becomes disabled", async () => {
        const { getAllByRole } = renderResult;
        const tabs = await screen.findAllByRole("tab");
        expect(tabs.length).toBe(16);
        const buttons = getAllByRole("button");
        // carousel left, right, menu button
        expect(buttons.length).toBe(3);
        const leftButton = buttons[0];
        expect(leftButton).toMatchInlineSnapshot(`
          <button
            aria-label="move to previous tab"
            class="neo-btn neo-btn--default neo-btn-tertiary neo-btn-tertiary--default neo-icon-chevron-left neo-tabs__carousel--button"
            data-badge=""
            dir="ltr"
          />
        `);
        const rightButton = buttons[1];
        userEvent.click(rightButton);
        userEvent.click(leftButton);
        expect(handleLeftCarouselMouseClickEvent).toBeCalled();
        expect(handleRightCarouselMouseClickEvent).toBeCalled();
      });
    });
  });
});
