import { FunctionComponent, useCallback, useEffect, useState } from "react";

import { dispatchInputOnChangeEvent } from "utils";
import { genId } from "utils/accessibilityUtils";

import { TextInput, TextInputProps } from "../TextInput";
import { LinkLogo, LinkLogoProps, Logo, LogoProps } from "./LeftContent/Logo";
import { NavbarAvatar, NavbarAvatarProps } from "./RightContent/NavbarAvatar";
import { NavbarButton, NavbarButtonProps } from "./RightContent/NavbarButton";

export interface NavbarProps {
  logo: LogoProps | LinkLogoProps;
  // TO:DO: NEO-731 - add Search Component to Design System
  search?: Pick<
    TextInputProps,
    | "clearable"
    | "disabled"
    | "placeholder"
    | "value"
    | "startIcon"
    | "aria-label"
    | "onChange"
  >;
  title?: string;
  navButtons?: NavbarButtonProps[];
  navbarAvatar?: NavbarAvatarProps;
}

// NOTE: COMPONENT IS NOT READY FOR CUSTOMERS TO USE, AND WILL BE EXPORTED IN SUBSEQUENT PRS

/**
 * Navbars are used to orient users, and to access different areas within an interface.
 *
 * This Component receives props for the left and right content areas
 * @example
 const exampleNavbarProps: NavbarProps = {
  logo: {
    link: "https://design.avayacloud.com",
    src: "http://design-portal-next-gen.herokuapp.com/images/logo-fpo.png",
    alt: "Link to Avaya",
  },
  search: {
    clearable: false,
    disabled: false,
    placeholder: "Search",
    startIcon: "search",
    "aria-label": "search",
  },
  title: "Product Name",
  navButtons: [
    { navButton: { badge: "", icon: "info" }, "aria-label": "Info" },
    { navButton: { badge: "", icon: "settings" }, "aria-label": "Settings" },
  ],
};

<Navbar {...exampleNavbarProps} />
};
 * @see https://design.avayacloud.com/components/web/navbar-web
 */

export const Navbar: FunctionComponent<NavbarProps> = ({
  logo,
  search,
  title,
  navButtons,
  navbarAvatar,
}) => {
  // TO-DO: NEO-616 - create Tabs Component
  // TO-DO: Implement Button to control collapsible Left Navigation
  // TO-DO: Replace inline styles on line 80 with updated CSS rules to avoid use of <form> element in Navbar
  // TO-DO: Replace inline styles on line 76 with updated CSS rules for correct styling of 'title' prop
  const [ids, setIds] = useState<string[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    setIds([]);
    navButtons?.forEach(() => {
      setIds((ids) => (ids = [...ids, genId()]));
    });
  }, [navButtons]);

  const isLink = (props: LogoProps): props is LinkLogoProps => {
    return "link" in props;
  };

  const navButtonOnClickCallback = useCallback(
    (clickHandler, id) => {
      if (clickHandler) clickHandler();
      setActiveId(ids[id]);
    },
    [ids]
  );

  return (
    <nav className="neo-navbar">
      <div className="neo-nav--left">
        {isLink(logo) ? <LinkLogo {...logo} /> : <Logo {...logo} />}

        {title && (
          <p
            style={{ fontSize: "19px", lineHeight: "28px", marginLeft: "16px" }}
          >
            {title}
          </p>
        )}

        {search && (
          <div style={{ marginLeft: "16px", alignSelf: "center" }}>
            <TextInput
              {...search}
              onChange={(e) =>
                dispatchInputOnChangeEvent(
                  e.target as HTMLInputElement,
                  (e.target as HTMLInputElement).value
                )
              }
            />
          </div>
        )}
      </div>

      <div className="neo-nav">
        {navButtons?.map((navButton, key) => {
          return (
            <NavbarButton
              key={key}
              {...navButton}
              active={ids[key] === activeId}
              id={ids[key]}
              onClick={() => navButtonOnClickCallback(navButton.onClick, key)}
            />
          );
        })}
        {navbarAvatar && <NavbarAvatar {...navbarAvatar} />}
      </div>
    </nav>
  );
};
