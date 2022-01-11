import { FunctionComponent } from "react";

import { TextInput, TextInputProps } from "../../TextInput";
import { NavbarLogo, NavbarLogoProps } from "./NavbarLogo";

export interface LeftContentProps {
  logo: NavbarLogoProps;
  search: Pick<
    TextInputProps,
    | "clearable"
    | "disabled"
    | "placeholder"
    | "value"
    | "startIcon"
    | "aria-label"
  >;
  productName?: string;
}

export const LeftContent: FunctionComponent<LeftContentProps> = ({
  logo,
  search,
  productName,
}) => {
  // TO-DO: NEO-616 - create Tabs Component
  // TO-DO: Replace inline styles with updated CSS rules to avoid use of <form> element in Navbar
  return (
    <div className="neo-nav--left">
      <NavbarLogo {...logo} />
      {productName && <h4>{productName}</h4>}
      <div style={{ marginLeft: "16px", alignSelf: "center" }}>
        <TextInput {...search} />
      </div>
    </div>
  );
};
