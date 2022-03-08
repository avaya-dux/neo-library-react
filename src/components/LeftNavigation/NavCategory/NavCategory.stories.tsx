import { Meta, Story } from "@storybook/react/types-6-0";

import { NavCategory, NavCategoryProps } from "./NavCategory";
import { LinkItem } from "../LinkItem";

export default {
  title: "Components/Left Navigation/Nav Category",
  component: NavCategory,
} as Meta<NavCategoryProps>;

export const NavCategoryTextOnly: Story<NavCategoryProps> = (
  props: NavCategoryProps
) => (
  <div className="neo-leftnav--wrapper">
    <nav className="neo-leftnav">
      <ul className="neo-leftnav__nav">
        <NavCategory expanded={true} label="Text Only Category">
          <LinkItem> First Item </LinkItem>
          <LinkItem> Second Item </LinkItem>
          <LinkItem> Third Item </LinkItem>
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
        <NavCategory icon="add" label="Top level link WIP"></NavCategory>
        <NavCategory icon="audio-on" expanded label="Should be expanded">
          <LinkItem> First Item </LinkItem>
          <LinkItem> Second Item </LinkItem>
          <LinkItem> Third Item </LinkItem>
          <LinkItem> Fourth Item </LinkItem>
        </NavCategory>
        <NavCategory icon="call" label="Should be collapsed">
          <LinkItem> Item 1 </LinkItem>
          <LinkItem> Item 2 </LinkItem>
          <LinkItem> Item 3</LinkItem>
        </NavCategory>
      </ul>
    </nav>
  </div>
);
