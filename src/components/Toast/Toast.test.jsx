import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";

import * as ToastStories from "./Toast.stories";

const { ToastMessageOnly, ToastWithIcon, ToastsPositioning } =
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
  });
});
