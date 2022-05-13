import { Meta } from "@storybook/react/types-7-0";
import { MouseEvent } from "react";
import { TopLinkItem, TopLinkItemProps } from "./TopLinkItem";
import { LeftNavigation } from "../LeftNavigation";

export default {
  title: "Components/Left Navigation/Top Link Item",
  component: TopLinkItem,
} as Meta<TopLinkItemProps>;
const handleClick = (e: MouseEvent) => {
  e.preventDefault();
  alert(`clicked on the item: ${e.currentTarget.textContent}`);
};
export const Default = () => (
  <LeftNavigation aria-label="Main Navigation" currentUrl="">
    <TopLinkItem label="Normal Link" onClick={handleClick} href="#" />
    <TopLinkItem active label="Active Link" onClick={handleClick} href="#" />
    <TopLinkItem
      label="Normal Link with Icon"
      icon="address-book"
      onClick={handleClick}
      href="#"
    />
    <TopLinkItem
      active
      label="Active Link with Icon"
      icon="address-book"
      onClick={handleClick}
      href="#"
    />
    <TopLinkItem
      label="Disabled Link"
      onClick={handleClick}
      disabled
      href="#"
    />
    <TopLinkItem
      label="Disabled Link with Icon"
      icon="address-book"
      onClick={handleClick}
      disabled
      href="#"
    />
  </LeftNavigation>
);
