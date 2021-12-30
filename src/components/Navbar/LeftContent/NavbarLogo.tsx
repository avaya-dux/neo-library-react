import { FunctionComponent } from "react";

export interface NavbarLogoProps {
  link?: string;
  src: string;
}

export const NavbarLogo: FunctionComponent<NavbarLogoProps> = ({
  link,
  src,
}) => {
  if (link) {
    return (
      <a href={link}>
        <img src={src} alt="" />
      </a>
    );
  } else {
    return <img src={src} alt="" />;
  }
};
