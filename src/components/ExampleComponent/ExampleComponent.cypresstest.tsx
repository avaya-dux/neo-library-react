import { mount } from "@cypress/react";
import { ExampleComponent } from ".";

describe("ExampleComponent component", () => {
  describe("a basic test suite", () => {
    it("renders without exploding", () => {
      const exampleText = "test";
      mount(<ExampleComponent text={exampleText} />);
      cy.contains(exampleText);
    });
  });
});
