import { composeStories } from "@storybook/testing-react";
import { render } from "@testing-library/react";
import { notificationLogger } from "components/Notification";
import { toastLogger } from "components/Toast";
import { axe } from "jest-axe";
import { popupManagerLogger, popupHookLogger } from ".";
import * as NotificationStories from "./PopupManager.notification.stories";
import * as ToastStories from "./PopupManager.toast.stories";
popupManagerLogger.disableAll();
popupHookLogger.disableAll();
notificationLogger.disableAll();
toastLogger.disableAll();

const { ToastMessageOnly, ToastWithIcon, DefaultToast, ToastsPositioning } =
  composeStories(ToastStories);

const { PopClosableEvent, PopCounterEvent } =
  composeStories(NotificationStories);

describe("PopupManager", () => {
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
    describe("PopCounterEvent", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<PopCounterEvent />);
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
    describe("PopClosableEvent", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<PopClosableEvent />);
      });
      it("should render ok", () => {
        const { container } = renderResult;
        expect(container).toBeDefined();
        document.getElementById("neo-popup-manager-bottom-right");
      });

      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });
  });
});
