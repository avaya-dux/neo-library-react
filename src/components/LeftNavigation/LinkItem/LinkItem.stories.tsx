import { Meta } from "@storybook/react/types-6-0";
import { MouseEvent } from "react";

import { NavCategory } from "components/LeftNavigation/NavCategory";
import { LinkItem } from "./LinkItem";

export default {
  title: "Components/Left Navgation/Link Item",
  component: LinkItem,
} as Meta;

const handleClick = (e: MouseEvent) => {
  e.preventDefault();
  alert(`clicked on the item: ${e.currentTarget.textContent}`);
};
const handleHover = () => {
  console.log("hovered on the item");
};
const handleFocus = () => {
  console.log("foucused on the item");
};

export const LinkItems = () => (
  <div className="neo-leftnav--wrapper">
    <nav className="neo-leftnav">
      <ul className="neo-leftnav__nav">
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
      </ul>
    </nav>
  </div>
);
