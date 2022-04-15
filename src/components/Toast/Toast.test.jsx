import { composeStories } from "@storybook/testing-react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import * as ToastStories from "./Toast.stories";
import { toastStoryLogger } from "./ToastStoryLogger";
import { popupManagerLogger } from "utils";
toastStoryLogger.disableAll();
popupManagerLogger.disableAll();

const { ToastMessageOnly, ToastWithIcon, DefaultToast, ToastsPositioning } =
  composeStories(ToastStories);

describe("Toast", () => {
  describe("Storybook", () => {
    describe(ToastMessageOnly, () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<ToastMessageOnly />);
      });
      it("should render ok", () => {
        const { container } = renderResult;
        expect(container).toBeDefined();
      });

      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });
    describe(ToastsPositioning, () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<ToastsPositioning />);
      });
      it("should render ok", () => {
        const { container } = renderResult;
        expect(container).toBeDefined();
      });

      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });
    describe(ToastWithIcon, () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<ToastWithIcon />);
      });
      it("should render ok", () => {
        const { container } = renderResult;
        expect(container).toBeDefined();
      });

      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });
    describe(DefaultToast, () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<DefaultToast />);
      });
      it("should render ok", () => {
        const { container } = renderResult;
        expect(container).toBeDefined();
      });

      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });
  });
});
