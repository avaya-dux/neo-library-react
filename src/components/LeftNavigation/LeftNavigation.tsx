import { FunctionComponent } from "react";

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
  const navId = genId();

  const handleSelectedLink = (id: string, url: string) => {
    console.log("handleSelectedLink CALLED");
    console.log({ id, url });
  };

  const navContext: NavigationContextType = {
    currentUrl: currentUrl,
    onSelectedLink: handleSelectedLink,
  };

  return (
    <RovingTabIndexProvider
      options={{ direction: "vertical", focusOnClick: true }}
    >
      <NavigationContext.Provider value={navContext}>
        <div id={navId} className="neo-leftnav--wrapper" role="navigation">
          <nav className="neo-leftnav">
            <ul className="neo-leftnav__nav">{children}</ul>
          </nav>
        </div>
      </NavigationContext.Provider>
    </RovingTabIndexProvider>
  );
};
