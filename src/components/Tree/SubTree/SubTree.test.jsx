import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { SubTree } from ".";
import { Branch } from "../Branch";

describe("SubTree", () => {
  it("fully renders without exploding", () => {
    render(<SubTree edges={[<Branch key="one">one</Branch>]}>example</SubTree>);

    const rootElement = screen.getByRole("treeitem");
    expect(rootElement).toBeInTheDocument();
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(
      <div role="tree">
        <SubTree edges={[<Branch key="one">one</Branch>]}>example</SubTree>
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
