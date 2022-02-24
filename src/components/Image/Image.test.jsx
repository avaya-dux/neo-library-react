import { composeStories } from "@storybook/testing-react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { Image } from "./Image";
import * as ImageStories from "./Image.stories";

import cat from "./200by300image.jpeg";

const { KittenImage, FallBackAsJSX, FallBackAsUrl } =
  composeStories(ImageStories);

describe("Image", () => {
  it("fully renders without exploding", () => {
    const { getByRole } = render(<Image alt="test image" src={cat} />);

    const hiddenImage = getByRole("img", { hidden: true });
    expect(hiddenImage).toBeTruthy();

    // TODO: this is... not a good test...
    setTimeout(() => {
      const displayedImage = getByRole("img", { hidden: false });
      expect(displayedImage).toBeTruthy();
    }, 100);
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(<Image alt="test image" src={cat} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("logs a console warning if the user does not pass `alt` text", () => {
    const consoleWarnSpy = jest
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    render(<Image src={cat} />);
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
  });

  it("calls passed `onError` method if passed and an error is thrown", () => {
    const onErrorSpy = jest.fn();

    render(
      <Image alt="test image" src="brokenimage.png" onError={onErrorSpy} />
    );

    // TODO: this is... not a good test...
    setTimeout(() => {
      expect(onErrorSpy).toHaveBeenCalledTimes(1);
    }, 1000);
  });

  it("calls passed `onLoad` method if passed and image loads properly", () => {
    const onLoadSpy = jest.fn();

    render(<Image alt="test image" src="brokenimage.png" onLoad={onLoadSpy} />);

    // TODO: this is... not a good test...
    setTimeout(() => {
      expect(onLoadSpy).toHaveBeenCalledTimes(1);
    }, 1000);
  });

  describe("storybook tests", () => {
    describe("KittenImage", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<KittenImage />);
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

    describe("FallBackAsJSX", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<FallBackAsJSX />);
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

    describe("FallBackAsUrl", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<FallBackAsUrl />);
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
});
