import clsx from "clsx";
import { FC } from "react";

import { genId } from "utils";

export interface SheetProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  id?: string;
  title?: string | JSX.Element;
  buttons?: JSX.Element[];
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
  id = genId(),
  title,
}) => {
  if (!title && !buttons) {
    return (
      <BasicSheet className={className} id={id}>
        {children}
      </BasicSheet>
    );
  } else if (!title && buttons) {
    console.error("If you add buttons, you must also provide a title");
  }

  return (
    <div
      aria-labelledby={id}
      className={clsx("neo-sheet sheet--custom", className)}
      role="dialog"
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

const BasicSheet: FC<{ id: string; className?: string }> = ({
  children,
  className,
  id,
}) => {
  return (
    <div className={clsx("neo-sheet", className)} id={id} data-testid={id}>
      {children}
    </div>
  );
};