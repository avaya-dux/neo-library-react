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
  title?: string;
}

export const LeftContent: FunctionComponent<LeftContentProps> = ({
  logo,
  search,
  title: productName,
}) => {
  // TO-DO: NEO-616 - create Tabs Component
  // TO-DO: Replace inline styles on line 32 with updated CSS rules to avoid use of <form> element in Navbar
  // TO-DO: Replace inline styles on line 31 with updated CSS rules for correct styling of 'title' prop
  return (
    <div className="neo-nav--left">
      <NavbarLogo {...logo} />
      {productName && (
        <p style={{ fontSize: "19px", lineHeight: "28px", marginLeft: "16px" }}>
          {productName}
        </p>
      )}
      <div style={{ marginLeft: "16px", alignSelf: "center" }}>
        <TextInput {...search} />
      </div>
    </div>
  );
};
