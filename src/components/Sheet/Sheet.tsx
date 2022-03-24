import clsx from "clsx";
import { FC } from "react";

import { genId, handleAccessbilityError, useIsInitialRender } from "utils";

import "./Sheet_shim.css";

type EnforcedAccessibleLabel =
  | {
      title: string | JSX.Element;
      buttons?: JSX.Element[];
      "aria-label"?: string;
      "aria-labelledby"?: string;
    }
  | {
      title?: string | JSX.Element;
      "aria-label": string;
      "aria-labelledby"?: string;
    }
  | {
      title?: string | JSX.Element;
      "aria-label"?: string;
      "aria-labelledby": string;
    };
interface BaseSheetProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  open?: boolean;
  id?: string;
  slide?: boolean;
}

export type SheetProps = BaseSheetProps & EnforcedAccessibleLabel;

/**
 * This component is used as a container of components that are dismisable.
 *
 * @example
 * <Sheet open={isOpen} slide={true} title="Mini Form">
 *  <Form>
 *   <TextInput />
 *   <TextInput />
 *  </Form>
 * </Sheet>
 *
 * @see https://design.avayacloud.com/components/web/sheet-web
 */
export const Sheet: FC<SheetProps> = ({
  children,
  className,
  open = true,
  id = genId(),
  slide = true,
  title,

  ...rest
}) => {
  const initialRender = useIsInitialRender();
  const buttons = "buttons" in rest ? rest.buttons : null;

  if (!(title || rest["aria-label"] || rest["aria-labelledby"])) {
    handleAccessbilityError(
      "Sheet must have an have an accessible name. Please add a `title`, `aria-label`, or `aria-labelledby` prop."
    );
  } else if (!title && buttons) {
    handleAccessbilityError(
      "If you add buttons, you must also provide a title"
    );
  } else if (!title && !buttons) {
    return (
      <BasicSheet
        className={className}
        open={open}
        id={id}
        initialRender={initialRender}
        slide={slide}
        {...rest}
      >
        {children}
      </BasicSheet>
    );
  }

  return (
    <div
      aria-labelledby={id}
      role="dialog"
      className={clsx(
        "neo-sheet sheet--custom",
        slide && "neo-slide",
        slide && open && "sheet-horizontal-slide-in-shim",
        slide && !open && "sheet-horizontal-slide-out-shim",
        !open && (initialRender || !slide) && "neo-display-none",
        className
      )}
      {...rest}
    >
      <div className="neo-sheet__header">
        <div className="neo-sheet__header--left">
          {typeof title === "string" ? <h4 id={id}>{title}</h4> : title}
        </div>

        <div className="neo-sheet__header--right">{buttons}</div>
      </div>

      {children}
    </div>
  );
};

const BasicSheet: FC<{
  className?: string;
  open: boolean;
  id?: string;
  initialRender: boolean;
  slide: boolean;
}> = ({ className, open, initialRender, slide, ...rest }) => {
  return (
    <div
      role="dialog"
      className={clsx(
        "neo-sheet",
        slide && "neo-slide",
        slide && open && "sheet-horizontal-slide-in-shim",
        slide && !open && "sheet-horizontal-slide-out-shim",
        !open && (initialRender || !slide) && "neo-display-none",
        className
      )}
      {...rest}
    ></div>
  );
};
