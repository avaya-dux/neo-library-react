import { FunctionComponent } from "react";

export interface NavbarLogoProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  link?: string;
  src: string;
}

export const NavbarLogo: FunctionComponent<NavbarLogoProps> = ({
  link,
  src,
  alt,
}) =>
  link ? (
    <a href={link}>
      <img src={src} alt={alt} />
    </a>
  ) : (
    <img src={src} alt={alt} />
  );
