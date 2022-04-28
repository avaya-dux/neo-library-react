import clsx from "clsx";
import { FC, ReactNode, useState, useEffect } from "react";
import { genId } from "utils";

export interface AccordionProps {
  header: ReactNode;
  id?: string;
  defaultExpanded?: boolean;
  disabled?: boolean;
  ariaLevel?: number;
  allowOnlyOneToExpand?: boolean;
  isOpen?: boolean;
  handleClick?: (id?: string | number) => void;
}

export const Accordion: FC<AccordionProps> = ({
  header,
  id = genId(),
  defaultExpanded = false,
  disabled,
  ariaLevel = 2,
  allowOnlyOneToExpand = false,
  isOpen,
  handleClick,
  children,
}) => {
  const [isActive, setIsActive] = useState(defaultExpanded);

  useEffect(() => {
    if (isOpen || defaultExpanded) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [isOpen]);

  return (
    <div className="neo-accordion">
      <div
        className={clsx(
          "neo-accordion__item",
          isActive && "neo-accordion__item--active"
        )}
      >
        <div
          className={clsx(
            "neo-accordion__header",
            disabled && "neo-accordion__header--disabled"
          )}
          role="heading"
          aria-label="Accordion Heading"
          aria-level={ariaLevel}
        >
          {disabled && (
            <button
              className="neo-accordion__header-text"
              aria-disabled
              disabled
            >
              {header}
            </button>
          )}

          {allowOnlyOneToExpand && handleClick ? (
            <button
              className="neo-accordion__header-text"
              aria-expanded={isActive ? "true" : "false"}
              aria-controls="accordion-panel"
              id={id}
              onClick={() => handleClick(id)}
            >
              {header}
            </button>
          ) : (
            <button
              className="neo-accordion__header-text"
              aria-expanded={isActive ? "true" : "false"}
              aria-controls="accordion-panel"
              id={id}
              onClick={() => setIsActive(!isActive)}
            >
              {header}
            </button>
          )}
        </div>

        {isActive && !disabled && (
          <div
            id="accordion-panel"
            className="neo-accordion__body"
            role="region"
          >
            <div className="neo-accordion__content">{children}</div>
          </div>
        )}
      </div>
    </div>
  );
};
