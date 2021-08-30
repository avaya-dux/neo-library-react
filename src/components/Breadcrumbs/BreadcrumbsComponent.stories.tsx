import { Meta } from "@storybook/react/types-6-0";

import { Breadcrumbs, IBreadcrumbs } from "./BreadcrumbsComponent";

export default {
  title: "Components/Breadcrumbs",
  component: Breadcrumbs,
} as Meta<IBreadcrumbs>;

const currentPageLink = { href: "#current_page", text: "Current Page" };
const description = "Breadcrumb Example page description";

const Template = (props: IBreadcrumbs) => <Breadcrumbs {...props} />;

export const CurrentPageOnly = Template.bind({});
CurrentPageOnly.args = {
  currentPageLink,
  description,
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
