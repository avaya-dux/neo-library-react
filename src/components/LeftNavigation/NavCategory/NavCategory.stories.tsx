import { Meta, Story } from "@storybook/react/types-6-0";

import { NavCategory, NavCategoryProps } from "./NavCategory";
import { LinkItem } from "../LinkItem";

export default {
  title: "Components/Left Navigation/Nav Category",
  component: NavCategory,
} as Meta<NavCategoryProps>;

export const TextOnly: Story<NavCategoryProps> = () => (
  <div className="neo-leftnav--wrapper">
    <nav className="neo-leftnav">
      <ul className="neo-leftnav__nav">
        <NavCategory active expanded={true} label="Text Only Category">
          <LinkItem> First Item </LinkItem>
          <LinkItem active={true}> Active Item </LinkItem>
          <LinkItem> Third Item </LinkItem>
        </NavCategory>
      </ul>
    </nav>
  </div>
);

export const Multiple: Story<NavCategoryProps> = () => (
  <div className="neo-leftnav--wrapper">
    <nav className="neo-leftnav">
      <ul className="neo-leftnav__nav">
        <NavCategory icon="audio-on" label="Collapsed">
          <LinkItem> First Item </LinkItem>
          <LinkItem> Second Item </LinkItem>
          <LinkItem> Third Item </LinkItem>
          <LinkItem> Fourth Item </LinkItem>
        </NavCategory>
        <NavCategory active expanded icon="call" label="Active">
          <LinkItem> Item 1 </LinkItem>
          <LinkItem active={true}> Active Item 2 </LinkItem>
          <LinkItem> Item 3</LinkItem>
        </NavCategory>
        <NavCategory disabled icon="available" label="Disabled Category">
          <LinkItem> First Item </LinkItem>
          <LinkItem> Second Item </LinkItem>
        </NavCategory>
      </ul>
    </nav>
  </div>
);
