import {
  FunctionComponent,
  KeyboardEvent,
  MouseEvent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { NavigationContext } from "./NavigationContext";
import { LeftNavProps, NavigationContextType } from "./LeftNavigationTypes";

import { genId, Keys } from "utils";

const LEFTNAV_STYLE: string = "neo-leftnav__main";

/**
 * This is the main Left Navigation outer container that contains all other subComponents
 *
 * @example
 * <LeftNavigation>
*   <NavCategory>
*     <LinkItem> First Item </LinkItem>
*     <LinkItem> Second Item </LinkItem>
*     <LinkItem> Third Item </LinkItem>
*   </NavCategory>
*   <TopLintItem icon="call"/>
*   <NavCategory>
*     <LinkItem active> First Item </LinkItem>
*     <LinkItem> Second Item </LinkItem>
*   </NavCategory>
* </LeftNavigation>


 * @see https://design.avayacloud.com/components/web/list-web
 */
export const LeftNavigation: FunctionComponent<LeftNavProps> = ({
  children,
  currentUrl = "",
}) => {
  const handleKeyDown = (event: KeyboardEvent) => {
    event.stopPropagation();
  };

  const handleSelectedLink = (id: string, url: string) => {
    console.log("handleSelectedLink CALLED");
    console.log({ id, url });
  };

  const navContext: NavigationContextType = {
    currentUrl: currentUrl,
    onSelectedLink: handleSelectedLink,
  };

  return (
    <NavigationContext.Provider value={navContext}>
      <div className="neo-leftnav--wrapper">
        <nav className="neo-leftnav">
          <ul className="neo-leftnav__nav">{children}</ul>
        </nav>
      </div>
    </NavigationContext.Provider>
  );
};
