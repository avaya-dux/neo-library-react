import { mount } from "@cypress/react";

import { Avatar } from "components/Avatar";

import { Tooltip, TooltipPosition } from ".";
import { translatePositionToCSSName } from "./helpers";

import "@avaya/neo/neo/dist/css/neo/neo.min.css";

describe("Tooltip component", () => {
  it("renders without exploding", () => {
    const datatestid = "Tooltip-root";
    const rootElement = `[data-testid='${datatestid}']`;
    const labelText = "cypress example label";

    mount(
      <Tooltip label={labelText} data-testid={datatestid}>
        <Avatar />
      </Tooltip>
    );

    cy.get(rootElement).should("contain.text", labelText);
  });

  describe("'auto' renders tooltips in an 'ideal' position on screen", () => {
    const labelText = "tiny text";
    const tooltipPositionClass = (position: Omit<TooltipPosition, "auto">) =>
      `neo-tooltip--${translatePositionToCSSName(position)}`;

    const topLeftDataTestid = "topleft-tooltip";
    const topLeftElement = `[data-testid='${topLeftDataTestid}']`;
    const topRightDataTestid = "topright-tooltip";
    const topRightElement = `[data-testid='${topRightDataTestid}']`;

    const middleLeftDataTestid = "middleleft-tooltip";
    const middleLeftElement = `[data-testid='${middleLeftDataTestid}']`;
    const middleRightDataTestid = "middleright-tooltip";
    const middleRightElement = `[data-testid='${middleRightDataTestid}']`;

    const bottomLeftDataTestid = "bottomleft-tooltip";
    const bottomLeftElement = `[data-testid='${bottomLeftDataTestid}']`;
    const bottomRightDataTestid = "bottomright-tooltip";
    const bottomRightElement = `[data-testid='${bottomRightDataTestid}']`;

    beforeEach(function () {
      mount(
        <main
          style={{
            border: "solid black",
            padding: "3px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Tooltip label={labelText} data-testid={topLeftDataTestid}>
              <Avatar />
            </Tooltip>

            <Tooltip label={labelText} data-testid={topRightDataTestid}>
              <Avatar />
            </Tooltip>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Tooltip
              label={labelText}
              style={{ margin: "auto" }}
              data-testid={middleLeftDataTestid}
            >
              <Avatar />
            </Tooltip>

            <span>
              This is a rectangle. If you hover over an avatar, you will see its
              tooltip auto position.
            </span>

            <Tooltip
              label={labelText}
              style={{ margin: "-30px auto auto auto" }}
              data-testid={middleRightDataTestid}
            >
              <Avatar />
            </Tooltip>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Tooltip label={labelText} data-testid={bottomLeftDataTestid}>
              <Avatar />
            </Tooltip>

            <Tooltip label={labelText} data-testid={bottomRightDataTestid}>
              <Avatar />
            </Tooltip>
          </div>
        </main>
      );
    });

    it("should assign the `right` position to a tooltip that does not have enough space above, below, or left of itself; and displays on hover", () => {
      cy.get(topLeftElement).should(
        "have.class",
        tooltipPositionClass("right")
      );
      cy.get(topLeftElement)
        .find("div.neo-tooltip__content")
        .should("not.be.visible");
      cy.get(topLeftElement)
        .realHover()
        .find("div.neo-tooltip__content")
        .should("be.visible");

      cy.get(bottomLeftElement).should(
        "have.class",
        tooltipPositionClass("right")
      );
      cy.get(bottomLeftElement)
        .find("div.neo-tooltip__content")
        .should("not.be.visible");
      cy.get(bottomLeftElement)
        .realHover()
        .find("div.neo-tooltip__content")
        .should("be.visible");
    });

    it("should assign the `left` position to a tooltip that does not have enough space above or below itself, but _does_ have space to the left of itself; and displays on hover", () => {
      cy.get(topRightElement).should(
        "have.class",
        tooltipPositionClass("left")
      );
      cy.get(topRightElement)
        .find("div.neo-tooltip__content")
        .should("not.be.visible");
      cy.get(topRightElement)
        .realHover()
        .find("div.neo-tooltip__content")
        .should("be.visible");

      cy.get(bottomRightElement).should(
        "have.class",
        tooltipPositionClass("left")
      );
      cy.get(bottomRightElement)
        .find("div.neo-tooltip__content")
        .should("not.be.visible");
      cy.get(bottomRightElement)
        .realHover()
        .find("div.neo-tooltip__content")
        .should("be.visible");
    });

    it("should assign the `top` position to a tooltip that has enough space above and to each side of itself; and displays on hover", () => {
      cy.get(middleLeftElement).should(
        "have.class",
        tooltipPositionClass("top")
      );
      cy.get(middleLeftElement)
        .find("div.neo-tooltip__content")
        .should("not.be.visible");
      cy.get(middleLeftElement)
        .realHover()
        .find("div.neo-tooltip__content")
        .should("be.visible");
    });

    it("should assign the `bottom` position to a tooltip that has enough space below and to each side of itself; and displays on hover", () => {
      cy.get(middleRightElement).should(
        "have.class",
        tooltipPositionClass("bottom")
      );
      cy.get(middleRightElement)
        .find("div.neo-tooltip__content")
        .should("not.be.visible");
      cy.get(middleRightElement)
        .realHover()
        .find("div.neo-tooltip__content")
        .should("be.visible");
    });
  });
});
