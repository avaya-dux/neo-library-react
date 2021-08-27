import { FunctionComponent, Fragment } from "react";

import "@avaya/neo/neo/dist/css/neo/neo.min.css";

export interface IBreadcrumbsLink {
  href: string;
  text: string;
}

export interface IBreadcrumbs {
  links: IBreadcrumbsLink[];
  currentPageLink: IBreadcrumbsLink;
  description: string;
  buttons?: FunctionComponent[]; // TODO: use NeoButton
}

export const Breadcrumbs = ({
  links = [],
  currentPageLink,
  description,
  buttons = [],
}: IBreadcrumbs) => {
  const currentPageIndex = links.length;
  return (
    <nav
      aria-label="Breadcrumb"
      className="neo-breadcrumbs"
      data-testid="Breadcrumbs-root"
    >
      <ol>
        {links.map((link, index) => (
          <li className="neo-breadcrumbs__link" key={index}>
            <a href={link.href}>{link.text} </a>
          </li>
        ))}
        <li
          className="neo-breadcrumbs__link neo-breadcrumbs__link--current"
          key={currentPageIndex}
        >
          <a href={currentPageLink.href} aria-current="page">
            {currentPageLink.text}
          </a>
        </li>
      </ol>
      <p className="neo-breadcrumbs__description">{description}</p>

      <div className="neo-breadcrumbs__actions">
        {buttons.map((button, index) => (
          <Fragment key={`breadcrumbs_button_${index}`}>{button}</Fragment>
        ))}
      </div>
    </nav>
  );
};
