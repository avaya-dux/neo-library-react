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
  <LeftNavigation ariaLabel="Text only Nav" currentUrl="http://active.com">
    <NavCategory expanded={true} label="Text Only Category">
      <LinkItem href="http://first.com"> First Item </LinkItem>
      <LinkItem href="http://active.com"> Active Item </LinkItem>
      <LinkItem href="http://third.com"> Third Item </LinkItem>
      <LinkItem href="http://avaya.com" disabled>
        Disabled Item
      </LinkItem>
    </NavCategory>
    <NavCategory label="Collapsed">
      <LinkItem href="http://link.com"> Link1 </LinkItem>
      <LinkItem href="http://dup.com"> Duplicate Link </LinkItem>
      <LinkItem href="http://dup.com"> Duplicate Link </LinkItem>
    </NavCategory>
    <NavCategory disabled label="Disabled Category">
      <LinkItem href="http://avaya.com"> First Item </LinkItem>
      <LinkItem href="http://avaya.com"> Second Item </LinkItem>
    </NavCategory>
  </LeftNavigation>
);

export const WithIcons: Story<NavCategoryProps> = () => (
  <LeftNavigation ariaLabel="Nav with Icons" currentUrl="http://active.com">
    <NavCategory icon="audio-on" label="Collapsed">
      <LinkItem href="http://first.com"> First Item </LinkItem>
      <LinkItem href="http://dup.com"> Duplicate Link </LinkItem>
      <LinkItem href="http://dup.com"> Duplicate Link</LinkItem>
      <LinkItem href="http://fourth.com"> Fourth Item </LinkItem>
    </NavCategory>
    <NavCategory expanded icon="call" label="Active">
      <LinkItem href="http://item1.com"> Item 1 </LinkItem>
      <LinkItem href="http://active.com"> Active Item </LinkItem>
      <LinkItem href="http://disabled.com" disabled>
        Disabled Item
      </LinkItem>
      <LinkItem href="http://item3.com"> Item 3</LinkItem>
    </NavCategory>
    <NavCategory disabled icon="available" label="Disabled Category">
      <LinkItem href="http://link.com"> Link </LinkItem>
      <LinkItem href="http://link2.com"> Link 2</LinkItem>
    </NavCategory>
  </LeftNavigation>
);
