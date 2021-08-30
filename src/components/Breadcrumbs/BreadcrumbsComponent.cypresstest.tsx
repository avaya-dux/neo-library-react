import { mount } from "@cypress/react";
import { Breadcrumbs } from "./BreadcrumbsComponent";

describe("Breadcrumbs component", () => {
  describe("Current page only", () => {
    it("renders description", () => {
      const currentPageLink = { href: "root", text: "root" };
      const description = "Breadcrumb Example page description";

      const props = {
        currentPageLink,
        description,
      };
      const rootElement = "[data-testid='Breadcrumbs-root']";
      mount(<Breadcrumbs {...props} />);
      cy.get(rootElement).should("contain.text", description);
    });
  });
});
