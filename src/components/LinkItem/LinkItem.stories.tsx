import { Meta } from "@storybook/react/types-6-0";

import { LinkItem } from "./LinkItem";

export default {
  title: "Components/Left Navgation/Link Item",
  component: LinkItem,
} as Meta;

const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
  event.preventDefault();
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
      hover={handleHover}
      isFocused={handleFocus}
      active={false}
      label={`Normal Link`}
    ></LinkItem>
    <LinkItem
      onClick={handleClick}
      hover={handleHover}
      isFocused={handleFocus}
      active={true}
      label={`Active Link`}
    >
      Active Link
    </LinkItem>
    <LinkItem
      onClick={handleClick}
      hover={handleHover}
      isFocused={handleFocus}
      active={false}
      disabled={true}
      label={`Disabled Link`}
    >
      Disabled Link
    </LinkItem>
  </ul>
);
