import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);
import { FormLayout } from ".";

describe("FormLayout", () => {
  const datatestid = "FormLayout-root";

  it("fully renders without exploding", () => {
    const { getByTestId } = render(<FormLayout />);

    const rootElement = getByTestId(datatestid);
    expect(rootElement).toBeTruthy();
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(<FormLayout />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("adds a class if `inline` is set to `true`", () => {
    const { getByTestId } = render(<FormLayout inline />);
    const rootElement = getByTestId(datatestid);
    expect(rootElement.classList.length).toBe(2);
  });

  describe("extends <form> appropriately", () => {
    it("takes normal <form> attributes, like `style`", () => {
      const { getByTestId } = render(<FormLayout style={{ color: "black" }} />);
      const rootElement = getByTestId(datatestid);
      expect(rootElement.style.color).toBeTruthy();
    });

    it("does not allow `className` to be overwritten, but it can be extended", () => {
      const { getByTestId } = render(<FormLayout className="fakeclassname" />);
      const rootElement = getByTestId(datatestid);
      expect(rootElement.classList.length).toBe(2);
    });
  });
});
