import { Meta } from "@storybook/react/types-6-0";
import { MouseEvent } from "react";
import log from "loglevel";

import { LeftNavigation } from "../LeftNavigation";
import { NavCategory } from "components/LeftNavigation/NavCategory";
import { LinkItem } from "./LinkItem";

const logger = log.getLogger("ListItem");
logger.disableAll();

export default {
  title: "Components/Left Navigation/Link Item",
  component: LinkItem,
} as Meta;

const handleClick = (e: MouseEvent) => {
  e.preventDefault();
  alert(`clicked on the item: ${e.currentTarget.textContent}`);
};
const handleHover = () => {
  logger.debug("hovered on the item");
};
const handleFocus = () => {
  logger.debug("foucused on the item");
};

export const LinkItems = () => (
  <LeftNavigation currentUrl="">
    <NavCategory label="Main Category">
      <LinkItem
        onClick={handleClick}
        onMouseOver={handleHover}
        onFocus={handleFocus}
        active={false}
      >
        Normal Link
      </LinkItem>
      <LinkItem
        onClick={handleClick}
        onMouseOver={handleHover}
        onFocus={handleFocus}
        active={true}
      >
        Active Link
      </LinkItem>
      <LinkItem
        onClick={handleClick}
        onMouseOver={handleHover}
        onFocus={handleFocus}
        active={false}
        disabled={true}
      >
        Disabled Link
      </LinkItem>
    </NavCategory>
  </LeftNavigation>
);
