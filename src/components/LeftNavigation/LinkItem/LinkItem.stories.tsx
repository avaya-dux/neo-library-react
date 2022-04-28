import { Meta } from "@storybook/react/types-6-0";
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

const handleClick = (id: string, url: string) => {
  alert(`clicked on the item with id: ${id}, url: ${url}`);
};
const handleHover = () => {
  logger.debug("hovered on the item");
};
const handleFocus = () => {
  logger.debug("foucused on the item");
};

export const LinkItems = () => (
  <LeftNavigation ariaLabel="Main Nav1" currentUrl="" onSelected={handleClick}>
    <NavCategory label="Main Category">
      <LinkItem
        onMouseOver={handleHover}
        onFocus={handleFocus}
        active={false}
        href="http://bing.com"
      >
        Normal Link
      </LinkItem>
      <LinkItem onMouseOver={handleHover} onFocus={handleFocus} active={true}>
        Active Link
      </LinkItem>
      <LinkItem
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
