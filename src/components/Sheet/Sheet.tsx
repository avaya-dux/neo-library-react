import clsx from "clsx";
import { FC } from "react";

import { genId, handleAccessbilityError } from "utils";

export interface SheetProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  open?: boolean;
  buttons?: JSX.Element[];
  id?: string;
  slide?: boolean;
  title?: string | JSX.Element;
}

/**
 * This component is used as a container
 * TODO: connect with Matt about how/why/where to use sheet(s)
 *
 * @example
 * <Sheet id="my-sheet">
 *  <Form>
 *   <TextInput />
 *   <TextInput />
 *  </Form>
 * </Sheet>
 *
 * @see https://design.avayacloud.com/components/web/sheet-web
 */
export const Sheet: FC<SheetProps> = ({
  buttons,
  children,
  className,
  open = true,
  id = genId(),
  slide = true,
  title,

  ...rest
}) => {
  if (!title && !buttons) {
    return (
      <BasicSheet
        className={className}
        open={open}
        id={id}
        slide={slide}
        {...rest}
      >
        {children}
      </BasicSheet>
    );
  } else if (!title && buttons) {
    handleAccessbilityError(
      "If you add buttons, you must also provide a title"
    );
  }

  return (
    <div
      aria-labelledby={id}
      className={clsx(
        "neo-sheet sheet--custom",
        slide && "neo-slide",
        slide && open && "neo-slide--in-right",
        slide && !open && "neo-slide--out-right",
        className
      )}
      role="dialog"
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
  slide: boolean;
}> = ({ className, open, slide, ...rest }) => {
  return (
    <div
      className={clsx(
        "neo-sheet",
        slide && "neo-slide",
        slide && open && "neo-slide--in-right",
        slide && !open && "neo-slide--out-right",
        className
      )}
      {...rest}
    ></div>
  );
};
