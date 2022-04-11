import clsx from "clsx";
import {
  cloneElement,
  Fragment,
  FunctionComponent,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from "react";

import { genId } from "utils/accessibilityUtils";

import { TextInputProps } from "../TextInput";
import { LinkLogoProps, LogoProps } from "./LeftContent";
import { NavbarAvatarProps, NavbarButtonProps } from "./RightContent";

export interface NavbarProps {
  logo: ReactElement<LogoProps | LinkLogoProps>;
  // TO:DO: NEO-731 - add Search Component to Design System
  search?: ReactElement<
    Pick<
      TextInputProps,
      | "clearable"
      | "disabled"
      | "placeholder"
      | "value"
      | "startIcon"
      | "aria-label"
      | "onChange"
    >
  >;
  title?: string;
  sticky?: boolean;
  navbarAvatar?: ReactElement<NavbarAvatarProps>;
  navButtons?: ReactElement<NavbarButtonProps>[];
  navMenuToggleBtn?: ReactElement<Partial<NavbarButtonProps>>;
}

/**
 * Navbars are used to orient users, and to access different areas within an interface.
 *
 * This Component receives props for the left and right content areas
 * @example
 const exampleNavbarProps: NavbarProps = {
  logo: {
    <Logo src="http://design-portal-next-gen.herokuapp.com/images/logo-fpo.png" />
  },
  search: {
  <TextInput
    clearable={true}
    disabled={false}
    placeholder="Search"
    startIcon="search"
    aria-label="search"
  />
  },
  title: "Product Name",
  navButtons: [
    <NavbarButton badge="" icon="info" aria-label="Info" />,
    <NavbarButton badge="" icon="settings" aria-label="Settings" />,
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
  navMenuToggleBtn,
  sticky,
}) => {
  // TO-DO: NEO-786 - Replace inline styles on line 80 with updated CSS rules to avoid use of <form> element in Navbar
  // TO-DO: NEO-785 - Replace inline styles on line 76 with updated CSS rules for correct styling of 'title' prop
  // TO-DO: NEO-794 - Confirm use-case for Avatar in Navbar without Dropdown and resulting need for inline styles on line 132
  const [ids, setIds] = useState<string[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    setIds([]);
    navButtons?.forEach(() => {
      setIds((ids) => (ids = [...ids, genId()]));
    });
  }, [navButtons]);

  const navButtonOnClickCallback = useCallback(
    (clickHandler, id) => {
      if (clickHandler) clickHandler();
      setActiveId(ids[id]);
    },
    [ids]
  );

  return (
    <nav className={clsx("neo-navbar", sticky && "neo-navbar--sticky")}>
      <div className="neo-nav--left">
        {navMenuToggleBtn}

        <>{logo}</>

        {title && (
          <div
            style={{ fontSize: "19px", lineHeight: "28px", marginLeft: "16px" }}
            role="heading"
            aria-level={1}
          >
            {title}
          </div>
        )}

        {search && (
          <div style={{ marginLeft: "16px", alignSelf: "center" }}>
            {search}
          </div>
        )}
      </div>

      <div className="neo-nav" style={{ alignItems: "center" }}>
        {navButtons?.map((navButton, key) => (
          <Fragment key={key}>
            {cloneElement(navButton, {
              active: ids[key] === activeId,
              id: ids[key],
              onClick: () =>
                navButtonOnClickCallback(navButton.props.handleClick, key),
            })}
          </Fragment>
        ))}
        <>{navbarAvatar}</>
      </div>
    </nav>
  );
};
