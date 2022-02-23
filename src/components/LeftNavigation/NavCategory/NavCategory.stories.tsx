import { Meta, Story } from "@storybook/react/types-6-0";

import { Icon } from "components";
import { ListItem } from "components/ListItem";
import { NavCategory, NavCategoryProps } from "./NavCategory";

export default {
  title: "Components/Nav Category",
  component: NavCategory,
} as Meta<NavCategoryProps>;

const iconStar = (
  <Icon
    role="img"
    aria-label="star icon"
    data-testid="neo-icon-star"
    id="icon-star"
    icon="star"
  />
);
const iconChat = (
  <Icon
    role="img"
    aria-label="chat icon"
    data-testid="neo-icon-chat"
    id="icon-chat"
    icon="chat"
  />
);

// NavCategory scenarios

export const NavCategoryTextOnly: Story<NavCategoryProps> = (
  props: NavCategoryProps
) => (
  <div className="neo-leftnav--wrapper">
    <nav className="neo-leftnav">
      <ul className="neo-leftnav__nav">
        <NavCategory expanded={true} label="Text Only Category">
          <ListItem {...props}>First item, text Only</ListItem>

          <ListItem {...props}>Second item, text only</ListItem>
        </NavCategory>
      </ul>
    </nav>
  </div>
);

export const NavCategoryMultiple: Story<NavCategoryProps> = (
  props: NavCategoryProps
) => (
  <div className="neo-leftnav--wrapper">
    <nav className="neo-leftnav">
      <ul className="neo-leftnav__nav">
        <NavCategory label="Text Only Category"></NavCategory>
        <NavCategory expanded label="Should be expanded"></NavCategory>
        <NavCategory label="Should be collapsed"></NavCategory>
      </ul>
    </nav>
  </div>
);
