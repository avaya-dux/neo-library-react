import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { InternalToast } from "./InternalToast";

describe("InternalToast", () => {
  describe("duration greater 1 second", () => {
    let renderResult;
    let remove;
    beforeEach(() => {
      jest.useFakeTimers();

      remove = jest.fn();
      renderResult = render(
        <InternalToast
          id="toast1"
          position="top"
          message="This is a toast"
          duration={5000}
          remove={remove}
        />
      );
    });
    it("should render ok", () => {
      const { container } = renderResult;
      expect(container).toBeDefined();
      const toast = screen.getByRole("alert");
      expect(toast).toHaveAttribute("aria-label", "5 seconds");
    });

    it("passes basic axe compliance", async () => {
      jest.useRealTimers();
      const { container } = renderResult;
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("timeout works", () => {
      jest.runAllTimers();
      expect(remove).toBeCalled();
    });
  });
  describe("duration less than 1 second", () => {
    let renderResult;
    let remove;
    beforeEach(() => {
      jest.useFakeTimers();

      remove = jest.fn();
      renderResult = render(
        <InternalToast
          id="toast1"
          position="top"
          message="This is a toast"
          duration={500}
          remove={remove}
        />
      );
    });
    it("should render ok", () => {
      const { container } = renderResult;
      expect(container).toBeDefined();
      const toast = screen.getByRole("alert");
      expect(toast).toHaveAttribute("aria-label", "1 second");
    });

    it("passes basic axe compliance", async () => {
      jest.useRealTimers();
      const { container } = renderResult;
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("timeout works", () => {
      jest.runAllTimers();
      expect(remove).toBeCalled();
    });
  });
});
