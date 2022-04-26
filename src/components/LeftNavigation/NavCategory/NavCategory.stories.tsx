import { Meta, Story } from "@storybook/react/types-6-0";

import { LeftNavigation } from "../LeftNavigation";
import { NavCategoryProps } from "../LeftNavigationTypes";
import { NavCategory } from "./NavCategory";
import { LinkItem } from "../LinkItem";

export default {
  title: "Components/Left Navigation/Nav Category",
  component: NavCategory,
} as Meta<NavCategoryProps>;

export const TextOnly: Story<NavCategoryProps> = () => (
  <LeftNavigation currentUrl="">
    <NavCategory active expanded={true} label="Text Only Category">
      <LinkItem> First Item </LinkItem>
      <LinkItem active={true}> Active Item </LinkItem>
      <LinkItem> Third Item </LinkItem>
      <LinkItem disabled> Disabled Item </LinkItem>
    </NavCategory>
    <NavCategory label="Collapsed">
      <LinkItem> First Item </LinkItem>
      <LinkItem> Second Item </LinkItem>
      <LinkItem> Third Item </LinkItem>
    </NavCategory>
    <NavCategory disabled label="Disabled Category">
      <LinkItem> First Item </LinkItem>
      <LinkItem> Second Item </LinkItem>
    </NavCategory>
  </LeftNavigation>
);

export const WithIcons: Story<NavCategoryProps> = () => (
  <LeftNavigation currentUrl="">
    <NavCategory icon="audio-on" label="Collapsed">
      <LinkItem> First Item </LinkItem>
      <LinkItem> Second Item </LinkItem>
      <LinkItem> Third Item </LinkItem>
      <LinkItem> Fourth Item </LinkItem>
    </NavCategory>
    <NavCategory active expanded icon="call" label="Active">
      <LinkItem> Item 1 </LinkItem>
      <LinkItem active={true}> Active Item 2 </LinkItem>
      <LinkItem disabled> Disabled Item </LinkItem>
      <LinkItem> Item 3</LinkItem>
    </NavCategory>
    <NavCategory disabled icon="available" label="Disabled Category">
      <LinkItem> First Item </LinkItem>
      <LinkItem> Second Item </LinkItem>
    </NavCategory>
  </LeftNavigation>
);
