import { cloneElement, FunctionComponent, ReactElement } from "react";

import { AvatarProps } from "components/Avatar";
import { MenuProps } from "components/Menu";

export interface NavbarAvatarProps {
  avatar: ReactElement<Omit<AvatarProps, "size" | "border" | "status">>;
  dropdown?: ReactElement<MenuProps>;
}

export const NavbarAvatar: FunctionComponent<NavbarAvatarProps> = ({
  avatar,
  dropdown,
}) => {
  const styledAvatar = cloneElement(avatar, {
    className: "neo-dropdown__link-header neo-avatar--medium",
  });

  return dropdown ? (
    <>
      {cloneElement(dropdown, {
        menuRootElement: styledAvatar,
      })}
    </>
  ) : (
    <>{avatar}</>
  );
};
