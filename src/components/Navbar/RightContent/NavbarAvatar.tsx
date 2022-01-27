import { FunctionComponent } from "react";

import { Avatar, AvatarProps } from "components/Avatar";
import { Menu, MenuProps } from "components/Menu";

export interface NavbarAvatarProps {
  avatar?: Omit<AvatarProps, "size" | "border" | "status">;
  dropdown?: Omit<MenuProps, "button">;
}

export const NavbarAvatar: FunctionComponent<NavbarAvatarProps> = ({
  avatar,
  dropdown,
}) => {
  const dropdownAvatar = (
    <Avatar
      {...avatar}
      className="neo-dropdown__link-header neo-avatar--medium"
    />
  );

  return dropdown ? (
    <Menu {...dropdown} menuRootElement={dropdownAvatar} />
  ) : (
    <Avatar {...avatar} />
  );
};
