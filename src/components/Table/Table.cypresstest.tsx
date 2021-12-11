import { mount } from "@cypress/react";

import { Table } from ".";
import { FilledFields } from "./mock-data";

import "@avaya/neo/neo/dist/css/neo/neo.min.css";

describe("Table component", () => {
  it("renders without exploding", () => {
    const datatestid = "Table-root";
    const rootElement = `[data-testid='${datatestid}']`;
    const captionText = "cypress table caption";

    mount(<Table {...FilledFields} caption={captionText} id={datatestid} />);

    cy.get(rootElement).should("contain.text", captionText);
  });

  // TODO-567: implement
  // it("should transition to and from an `<th>` checked='indeterminate' state to `true` and `false` properly", () =>{})
});
