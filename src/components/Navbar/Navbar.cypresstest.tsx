import { mount } from "@cypress/react";

import { NavbarWithSearch } from "./Navbar.stories";
import { TextInput } from "components/TextInput";
import { Logo } from "./LeftContent";
import fpo from "./logo-fpo.png";

const logo = <Logo src={fpo} />;

const search = (
  <TextInput
    clearable={true}
    disabled={false}
    placeholder="Search"
    startIcon="search"
    aria-label="search"
  />
);

describe("Skip Navigation component", () => {
  it("should be always present in DOM", () => {
    mount(<NavbarWithSearch logo={logo} search={search} />);

    cy.get("a").contains("Skip").should("have.class", "neo-skipnav");
  });
});
