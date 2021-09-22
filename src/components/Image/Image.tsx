import { forwardRef, useEffect, useMemo, useState } from "react";

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallback?: React.ReactNode;
}

export const Image: React.FC<ImageProps> = forwardRef(
  (
    { className, src, alt, fallback, ...rest }: ImageProps,
    ref: React.Ref<HTMLImageElement>
  ) => {
    const [showHTMLFallback, updateShowHTMLFallback] = useState(false);
    if (!alt) {
      console.warn(
        `Alternative text should be added to the image if it conveys meaning and is not displayed elsewhere on the page.
        Decorative and branding images do not need alt text.`
      );
    }

    useEffect(() => {
      updateShowHTMLFallback(false);
    }, [src]);

    const componentClasses = useMemo(() => {
      return ["neo-img neo-img--fluid", className].join(" ");
    }, []);

    const computedProps = {
      ref,
      className: componentClasses,
      src,
      ...rest,
    };

    if (showHTMLFallback && typeof fallback === "string")
      computedProps.src = fallback;

    return showHTMLFallback && typeof fallback !== "string" ? (
      <div>{fallback}</div>
    ) : (
      <img
        alt={alt || ""}
        {...computedProps}
        onError={() => updateShowHTMLFallback(true)}
      />
    );
  }
);
