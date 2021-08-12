import { mount } from "@cypress/react";
import { ExampleComponent } from ".";

describe("ExampleComponent component", () => {
  describe("a basic test suite", () => {
    it("renders without exploding", () => {
      const rootElement = "[data-testid='ExampleComponent-root']";
      const exampleText = "test";
      mount(<ExampleComponent text={exampleText} />);
      cy.get(rootElement).should("contain.text", exampleText);
    });
  });
});
