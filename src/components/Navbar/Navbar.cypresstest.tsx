import { mount } from "@cypress/react";

import { NavbarWithSearch } from "./Navbar.stories";
import { TextInput } from "components/TextInput";
import { Logo } from "./LeftContent";
import fpo from "./logo-fpo.png";

// const Template: Story<NavbarProps> = (props: NavbarProps) => {
//   return <Navbar {...props} />;
// };

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

  it("should not be shown when not focused", () => {
    mount(<NavbarWithSearch logo={logo} search={search} />);

    // Set focus on input component
    // cy.get("input").first().focus();

    // Skip Nav anchor should be "hidden away" from view when not focused
    // cy.get("a").invoke("css", "left").should("equal", "-10000px");
    cy.get("a").invoke("css", "height").should("equal", "1px");
    cy.get("a").invoke("css", "width").should("equal", "1px");
  });

  it("should be shown when it receives focus", () => {
    mount(<NavbarWithSearch logo={logo} search={search} />);

    // Set focus on input component
    cy.get("input").first().focus();

    cy.realPress(["Shift", "Tab"]); // Give focus to Skip Nav link
    // cy.focused().invoke("css", "left").should("equal", "30px");
    cy.get("a").invoke("css", "height").should("equal", "1px");
    cy.get("a").invoke("css", "width").should("equal", "1px");
  });
});
