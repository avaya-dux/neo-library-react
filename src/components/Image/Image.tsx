import clsx from "clsx";
import {
  ImgHTMLAttributes,
  ReactElement,
  useEffect,
  useMemo,
  useState,
} from "react";

import { handleAccessbilityError } from "utils";

/**
 * The Image component displays and image while also providing a
 * fallback that is used when the image is loading or fails to load.
 *
 * @example
 * <Image alt="test image" width={200} height={300} src={localImage} fallback="https://via.placeholder.com/200x300" />
 *
 * @see https://neo-library-react-storybook.netlify.app/?path=/story/components-image--default-image
 */
export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallback?: ReactElement | string;
}

export const Image = ({
  alt = "",
  className,
  fallback,
  onError,
  onLoad,
  src,
  style,

  ...rest
}: ImageProps) => {
  if (!alt) {
    handleAccessbilityError(
      `Alternative text should be added to the image if it conveys meaning and is not displayed elsewhere on the page.
        Decorative and branding images do not need alt text.`
    );
  }

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const useFallback = useMemo(
    () => !!fallback && (isLoading || hasError),
    [fallback, isLoading]
  );

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [src]);

  const fallbackComponent =
    typeof fallback === "string" ? (
      <img alt={alt} src={fallback} style={style} {...rest} />
    ) : (
      fallback
    );

  return (
    <>
      <img
        alt={alt}
        className={clsx("neo-img neo-img--fluid", className)}
        src={src}
        onError={(e) => {
          setHasError(true);
          if (onError) onError(e);
        }}
        onLoad={(e) => {
          setIsLoading(false);
          if (onLoad) onLoad(e);
        }}
        {...rest}
        style={{
          ...style,
          ...(useFallback ? { display: "none" } : {}),
        }}
      />

      {useFallback && fallbackComponent}
    </>
  );
};
