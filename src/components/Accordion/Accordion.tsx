import clsx from "clsx";
import { FC, ReactNode, useState, useEffect } from "react";
import { genId } from "utils";

export interface AccordionProps {
  header: ReactNode;
  headerId?: string;
  defaultExpanded?: boolean;
  disabled?: boolean;
  "aria-level"?: number;
  "aria-label"?: string;
  isOpen?: boolean;
  handleClick?: () => void;
}

export const Accordion: FC<AccordionProps> = ({
  header,
  headerId = genId(),
  defaultExpanded = false,
  disabled = false,
  "aria-level": ariaLevel = 2,
  "aria-label": ariaLabel = "Accordion Heading",
  isOpen,
  handleClick,
  children,
}) => {
  const [isActive, setIsActive] = useState(defaultExpanded);

  const bodyId = `accordion-control-${headerId}`;

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
          aria-label={ariaLabel}
          aria-level={ariaLevel}
        >
          <button
            className="neo-accordion__header-text"
            aria-expanded={isActive ? "true" : "false"}
            aria-controls={bodyId}
            id={headerId}
            onClick={() => {
              handleClick ? handleClick() : setIsActive(!isActive);
            }}
            disabled={disabled}
            // aria-disabled below condition is for screen reader when allowOnlyOne prop is true from parent component.
            aria-disabled={isActive && handleClick ? true : false}
          >
            {header}
          </button>
        </div>

        {isActive && !disabled && (
          <div id={bodyId} className="neo-accordion__body">
            <div className="neo-accordion__content">{children}</div>
          </div>
        )}
      </div>
    </div>
  );
};
