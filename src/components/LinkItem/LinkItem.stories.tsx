import { Meta } from "@storybook/react/types-6-0";
import { MouseEvent } from "react";

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
  <ul>
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
  </ul>
);
