import { FunctionComponent, useCallback } from "react";

import { RovingTabIndexProvider } from "react-roving-tabindex";
import { genId } from "utils";

import { NavigationContext } from "./NavigationContext";
import { LeftNavProps, NavigationContextType } from "./LeftNavigationTypes";

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
*   <TopLinkItem icon="call"/>
*   <NavCategory>
*     <LinkItem active> First Item </LinkItem>
*     <LinkItem> Second Item </LinkItem>
*   </NavCategory>
* </LeftNavigation>


 * @see https://design.avayacloud.com/components/web/left-nav-web
 */
export const LeftNavigation: FunctionComponent<LeftNavProps> = ({
  ariaLabel = "",
  children,
  currentUrl = "",
  onSelected = null,
}) => {
  if (ariaLabel === "") {
    console.error(
      "A descriptive ariaLabel prop value is required for screen readers to identify the navigation component"
    );
  }

  const navId = genId();

  const handleSelectedLink = useCallback(
    (id: string, url: string) => {
      if (onSelected) {
        onSelected(id, url);
      } else {
        console.error(
          "Please provide a handler funciton for onSelected prop in LeftNavigation"
        );
      }
    },
    [onSelected]
  );

  const navContext: NavigationContextType = {
    currentUrl: currentUrl,
    onSelectedLink: handleSelectedLink,
  };

  return (
    <RovingTabIndexProvider
      options={{ direction: "vertical", focusOnClick: true }}
    >
      <NavigationContext.Provider value={navContext}>
        <div
          aria-label={ariaLabel}
          id={navId}
          className="neo-leftnav--wrapper"
          role="navigation"
        >
          <nav className="neo-leftnav">
            <ul className="neo-leftnav__nav">{children}</ul>
          </nav>
        </div>
      </NavigationContext.Provider>
    </RovingTabIndexProvider>
  );
};
