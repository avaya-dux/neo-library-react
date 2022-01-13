import clsx from "clsx";
import { FunctionComponent, useEffect, useState } from "react";

import { dispatchInputOnChangeEvent } from "utils";
import { genId } from "utils/accessibilityUtils";

import { TextInput, TextInputProps } from "../TextInput";
import { Logo, LogoProps } from "./LeftContent/Logo";
import { NavbarButton, NavbarButtonProps } from "./RightContent/NavbarButton";

export interface NavbarProps {
  logo: LogoProps;
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
}

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
}) => {
  // TO-DO: NEO-616 - create Tabs Component
  // TO-DO: Implement Avatar
  // TO-DO: Implement Dropdown
  // TO-DO: Implement Button to control collapsible Left Navigation
  // TO-DO: Replace inline styles on line 80 with updated CSS rules to avoid use of <form> element in Navbar
  // TO-DO: Replace inline styles on line 76 with updated CSS rules for correct styling of 'title' prop
  const [ids, setIds] = useState<string[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    navButtons?.forEach(() => {
      setIds((ids) => (ids = [...ids, genId()]));
    });
  }, [navButtons]);

  return (
    <nav className="neo-navbar">
      <div className="neo-nav--left">
        <Logo {...logo} />

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
            <div
              key={key}
              className={clsx(
                "neo-badge__navbutton",
                activeId === ids[key] && "neo-badge__navbutton--active"
              )}
            >
              <NavbarButton
                {...navButton}
                id={ids[key]}
                onClick={() => {
                  if (navButton.handleClick) navButton.handleClick();
                  setActiveId(ids[key]);
                }}
              />
            </div>
          );
        })}
      </div>
    </nav>
  );
};
