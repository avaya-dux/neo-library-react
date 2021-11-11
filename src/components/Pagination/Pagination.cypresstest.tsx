import { mount } from "@cypress/react";
import { composeStories } from "@storybook/testing-react";

import * as PaginationStories from "./Pagination.stories";

const { Default } = composeStories(PaginationStories);

describe("Pagination component", () => {
  it("should update the page count based on how many items are shown per page", () => {
    mount(<Default />);

    // there should be 100 items in the list
    cy.get("input").should("have.value", "100");

    // show 5 items per page
    cy.get("select").select("5");

    // should have 7 pages
    cy.get("ul.neo-pagination__list").find("li").should("have.length", 7);

    // show 10 items per page
    cy.get("select").select("10");

    // should have 10 pages
    cy.get("ul.neo-pagination__list").find("li").should("have.length", 10);
  });

  // TODO-565: more tests
  // it("should navigate between page via 'left'/'right' buttons", () => {})
  // it("should navigate between page via nav buttons", () => {})
});
