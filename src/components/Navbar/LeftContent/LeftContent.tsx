import { FunctionComponent } from "react";

import { NavbarLogo, NavbarLogoProps } from "./NavbarLogo";
import { Form } from "components";
import { TextInput, TextInputProps } from "../../TextInput";

export interface LeftContentProps {
  logo: NavbarLogoProps;
  search: Pick<
    TextInputProps,
    "clearable" | "disabled" | "placeholder" | "value" | "startIcon"
  >;
  productName?: string;
}

export const LeftContent: FunctionComponent<LeftContentProps> = ({
  logo,
  search,
  productName,
}) => {
  // TO-DO: NEO-616 - create Tabs Component
  return (
    <div className="neo-nav--left">
      <NavbarLogo {...logo} />
      {productName && <h4>{productName}</h4>}
      <TextInput {...search} />
    </div>
  );
};
