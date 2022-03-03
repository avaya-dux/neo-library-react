import { Meta, Story } from "@storybook/react/types-6-0";

import { NavCategory, NavCategoryProps } from "./NavCategory";

export default {
  title: "Components/Nav Category",
  component: NavCategory,
} as Meta<NavCategoryProps>;

// NavCategory scenarios

export const NavCategoryTextOnly: Story<NavCategoryProps> = (
  props: NavCategoryProps
) => (
  <div className="neo-leftnav--wrapper">
    <nav className="neo-leftnav">
      <ul className="neo-leftnav__nav">
        <NavCategory expanded={true} label="Text Only Category">
          <li className="neo-leftnav__sub">
            <a href=" ">Overview</a>
          </li>
          <li className="neo-leftnav__sub">
            <a href=" ">Manage Users</a>
          </li>
          <li className="neo-leftnav__sub neo-leftnav__sub--active">
            <a href=" ">Billing</a>
          </li>
          <li className="neo-leftnav__sub">
            <a href=" ">Payments</a>
          </li>
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
          <li className="neo-leftnav__sub">
            <a href=" ">Overview</a>
          </li>
          <li className="neo-leftnav__sub">
            <a href=" ">Manage Users</a>
          </li>
          <li className="neo-leftnav__sub neo-leftnav__sub--active">
            <a href=" ">Billing</a>
          </li>
          <li className="neo-leftnav__sub">
            <a href=" ">Payments</a>
          </li>
        </NavCategory>
        <NavCategory icon="call" label="Should be collapsed">
          <li className="neo-leftnav__sub">
            <a href=" ">Link1</a>
          </li>
          <li className="neo-leftnav__sub">
            <a href=" ">Link2</a>
          </li>
          <li className="neo-leftnav__sub neo-leftnav__sub--active">
            <a href=" ">Link3</a>
          </li>
        </NavCategory>
      </ul>
    </nav>
  </div>
);
