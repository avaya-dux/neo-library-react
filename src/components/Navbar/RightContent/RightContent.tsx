import { FunctionComponent, useEffect, useState } from "react";

import { genId } from "utils/accessibilityUtils";

import { NavbarNavButton, NavbarNavButtonProps } from "./NavbarNavButton";

export interface RightContentProps {
  navButtons: NavbarNavButtonProps[];
}

export const RightContent: FunctionComponent<RightContentProps> = ({
  navButtons,
}) => {
  const [ids, setIds] = useState<string[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    navButtons.forEach(() => {
      const internalId = genId();
      setIds((ids) => (ids = [...ids, internalId]));
    });
  }, [navButtons]);

  return (
    <div className="neo-nav">
      {navButtons.map((navButton, key) => {
        return (
          <div
            key={key}
            className={`neo-badge__navbutton${
              activeId === ids[key] ? " neo-badge__navbutton--active" : ""
            }`}
          >
            <NavbarNavButton
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
  );
};
