import { composeStories } from "@storybook/testing-react";
import { render } from "@testing-library/react";
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
      it("When left carousel button is clicked, left button event handler is called", () => {
        const { getAllByRole } = renderResult;
        const buttons = getAllByRole("button");
        // carousel left, right, menu button
        expect(buttons.length).toBe(3);

        const leftButton = buttons[0];
        userEvent.click(leftButton);
        expect(handleLeftCarouselMouseClickEvent).toBeCalled();
      });
      it("When right carousel button is clicked, right button event handler is called", () => {
        const { getAllByRole } = renderResult;
        const buttons = getAllByRole("button");
        // carousel left, right, menu button
        expect(buttons.length).toBe(3);

        const rightButton = buttons[1];
        userEvent.click(rightButton);
        expect(handleRightCarouselMouseClickEvent).toBeCalled();
      });
    });
  });
});
