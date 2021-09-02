import { Meta } from "@storybook/react/types-6-0";

import { Breadcrumbs, BreadcrumbsProps } from "./Breadcrumbs";

export default {
  title: "Components/Breadcrumbs",
  component: Breadcrumbs,
} as Meta<BreadcrumbsProps>;

const currentPageLink = { href: "#current_page", text: "Current Page" };
const description = "Breadcrumb Example page description";

const Template = (props: BreadcrumbsProps) => <Breadcrumbs {...props} />;

export const CurrentPageOnly = Template.bind({});
CurrentPageOnly.args = {
  currentPageLink,
};

export const HavingOneLink = Template.bind({});
const oneParent = [{ href: "#parent1", text: "parent1" }];
HavingOneLink.args = {
  links: oneParent,
  currentPageLink,
  description,
};

export const HavingTwoLinks = Template.bind({});
const twoParents = [
  { href: "#parent1", text: "Previous Page 1" },
  { href: "#parent2", text: "previous page 2" },
];
HavingTwoLinks.args = {
  links: twoParents,
  currentPageLink,
  description,
};

// TODO: Current page only + Buttons
// TODO: Having one link + Buttons
// TODO: Having two links + Buttons
