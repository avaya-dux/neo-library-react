import { FunctionComponent } from "react";

import { Avatar, AvatarProps, Menu, MenuProps } from "components";

export interface NavbarAvatarProps {
  avatar?: Omit<AvatarProps, "size" | "border" | "status">;
  dropdown?: Partial<MenuProps>;
}

export const NavbarAvatar: FunctionComponent<NavbarAvatarProps> = ({
  avatar,
  dropdown,
}) => {
  // TO-DO: NEO-794 - Add correct spacing for Avatar without Dropdown, and add hover styles for Avatar with Dropdown in Neo CSS
  const dropdownAvatar = (
    <Avatar
      {...avatar}
      className="neo-dropdown__link-header neo-avatar--medium"
    />
  );

  return dropdown ? (
    <Menu {...dropdown} button={dropdownAvatar} rightAligned />
  ) : (
    <Avatar {...avatar} />
  );
};
