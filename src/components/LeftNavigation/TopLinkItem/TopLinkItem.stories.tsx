import { Meta } from "@storybook/react/types-7-0";
import { TopLinkItem, TopLinkItemProps } from "./TopLinkItem";
import { MouseEvent } from "react";

export default {
  title: "Components/Left Navigation/Top Link Item",
  component: TopLinkItem,
} as Meta<TopLinkItemProps>;
const handleClick = (e: MouseEvent) => {
  e.preventDefault();
  alert(`clicked on the item: ${e.currentTarget.textContent}`);
};
export const Default = () => (
  <div className="neo-leftnav--wrapper">
    <nav className="neo-leftnav">
      <ul className="neo-leftnav__nav">
        <TopLinkItem label="Normal Link" onClick={handleClick} href="#" />
        <TopLinkItem
          active
          label="Active Link"
          onClick={handleClick}
          href="#"
        />
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
      </ul>
    </nav>
  </div>
);