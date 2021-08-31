import { mount } from "@cypress/react";
import { Breadcrumbs } from "./BreadcrumbsComponent";

describe("Breadcrumbs component", () => {
  describe("Current page only", () => {
    it("renders ok", () => {
      const currentPageLink = { href: "#root", text: "root" };
      const description = "Breadcrumb Example page description";

      const props = {
        currentPageLink,
        description,
      };
      const rootElement = "[data-testid='Breadcrumbs-root']";
      mount(<Breadcrumbs {...props} />);
      cy.get(rootElement).should("contain.text", description);
      cy.get(".neo-breadcrumbs__link--current")
        .should("have.class", "neo-breadcrumbs__link")
        .find("a")
        .should("contain", "root")
        .should("have.attr", "href", "#root");
    });
  });
});
