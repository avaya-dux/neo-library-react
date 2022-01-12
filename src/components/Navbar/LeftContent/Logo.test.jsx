import { fireEvent, render } from "@testing-library/react";
import { axe } from "jest-axe";

import { Logo } from "./Logo";

describe("Logo", () => {
  it("renders without exploding", () => {
    const { container } = render(<Logo src="http://design-portal-next-gen.herokuapp.com/images/logo-fpo.png"/>);
    expect(container).not.toBe(null);
  });
  it("passes basic axe compliance", async () => {
    const { container } = render(<Logo src="http://design-portal-next-gen.herokuapp.com/images/logo-fpo.png"/>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it("warns when alt text not included with link", () => {
    const spy = jest.spyOn(console, "warn").mockImplementation(() => {});
    const { container } = render(<Logo src="http://design-portal-next-gen.herokuapp.com/images/logo-fpo.png" link="#"/>)
    expect(spy.mock.calls.length).toBe(1);
  })
});