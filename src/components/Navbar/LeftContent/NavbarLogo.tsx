import { FunctionComponent } from "react";

export interface NavbarLogoProps {
  link?: string;
  src: string;
}

export const NavbarLogo: FunctionComponent<NavbarLogoProps> = ({
  link,
  src,
}) => {
  return link ? (
    <a href={link}>
      <img src={src} alt="" />
    </a>
  ) : (
    <img src={src} alt="" />
  );
};
