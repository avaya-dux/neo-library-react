import { FC } from "react";

import { Button, ButtonProps } from "components/Button";

export const MenuButton: FC<ButtonProps> = ({ children, ...rest }) => (
  <Button className="neo-dropdown__link-header" {...rest}>
    {children || "Menu Button"}
  </Button>
);
