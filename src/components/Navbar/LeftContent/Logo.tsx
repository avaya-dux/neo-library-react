import { FunctionComponent } from "react";

export interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  link?: string;
  src: string;
}

export const Logo: FunctionComponent<LogoProps> = ({ link, src, alt = "" }) => {
  if (link && !alt) {
    console.warn(
      "Note that anchor elements with images as content require alt text for accessibility compliance"
    );
  }

  return link ? (
    <a href={link}>
      <img src={src} alt={alt} />
    </a>
  ) : (
    <img src={src} alt={alt} />
  );
};
