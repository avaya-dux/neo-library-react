import { fireEvent, render } from "@testing-library/react";
import { axe } from "jest-axe";

import { Logo } from "./Logo";

describe("Logo", () => {
  it("renders without exploding", () => {
    const { container } = render(
      <Logo src="http://design-portal-next-gen.herokuapp.com/images/logo-fpo.png" />
    );
    expect(container).not.toBe(null);
  });

  it("does not render link when not passed", () => {
    const { getByRole } = render(<Logo src="http://design-portal-next-gen.herokuapp.com/images/logo-fpo.png" />);
    expect(() => getByRole("link")).toThrow();
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(
      <Logo src="http://design-portal-next-gen.herokuapp.com/images/logo-fpo.png" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  describe("Behaviour when acting as link", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(
        <Logo
          src="http://design-portal-next-gen.herokuapp.com/images/logo-fpo.png"
          link="#"
        />
      );
    });
    
    it("renders link correctly", () => {
      const { getByRole } = renderResult;
      const linkElement = getByRole("link");
      expect(linkElement).toBeTruthy();
    });
  });
});
