import clsx from "clsx";
import { ImgHTMLAttributes, ReactElement, useEffect, useState } from "react";

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallback?: ReactElement | string;
}

export const Image = ({
  alt = "",
  className,
  fallback,
  height,
  onError,
  onLoad,
  src,
  width,

  ...rest
}: ImageProps) => {
  if (!alt) {
    console.warn(
      `Alternative text should be added to the image if it conveys meaning and is not displayed elsewhere on the page.
        Decorative and branding images do not need alt text.`
    );
  }

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(false);
  }, [src]);

  let status = null;
  if (isLoaded === false && fallback) {
    status =
      typeof fallback === "string" ? (
        <img alt={alt} src={fallback} width={width} height={height} />
      ) : (
        fallback
      );
  }

  return (
    <>
      <img
        alt={alt}
        className={clsx("neo-img neo-img--fluid", className)}
        height={height}
        src={src}
        width={width}
        onError={(e) => {
          if (onError) onError(e);
        }}
        onLoad={(e) => {
          setIsLoaded(true);
          if (onLoad) onLoad(e);
        }}
        {...rest}
        style={isLoaded === false ? { display: "none" } : {}}
      />

      {status}
    </>
  );
};
