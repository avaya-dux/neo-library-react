import clsx from "clsx";
import {
  FC,
  ReactNode,
  useState,
  useEffect,
  ButtonHTMLAttributes,
} from "react";
import { genId } from "utils";

export interface AccordionProps {
  header: ReactNode;
  id?: string;
  defaultExpanded?: boolean;
  disabled?: boolean;
  "aria-level"?: number;
  "aria-label"?: string;
  allowOnlyOne?: boolean;
  isOpen?: boolean;
  handleClick?: (id?: string | number) => void;
}

export const Accordion: FC<AccordionProps> = ({
  header,
  id = genId(),
  defaultExpanded = false,
  disabled,
  "aria-level": ariaLevel = 2,
  "aria-label": ariaLabel = "Accordion Heading",
  allowOnlyOne = false,
  isOpen,
  handleClick,
  children,
}) => {
  const [isActive, setIsActive] = useState(defaultExpanded);
  const ariaControlText = `accordion-heading-${id}`;
  const ariaLabelText = `accordion-body-${id}`;

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
          {disabled && allowOnlyOne && (
            <button
              className="neo-accordion__header-text"
              aria-disabled
              disabled
            >
              {header}
            </button>
          )}
          {disabled && !allowOnlyOne && (
            <button
              className="neo-accordion__header-text"
              aria-disabled
              disabled
            >
              {header}
            </button>
          )}

          {allowOnlyOne && handleClick && !disabled ? (
            <button
              className="neo-accordion__header-text"
              aria-expanded={isActive ? "true" : "false"}
              aria-controls={ariaControlText}
              aria-labelledby={id}
              // id={id}
              onClick={() => handleClick(id)}
            >
              {header}
            </button>
          ) : (
            !disabled && (
              <button
                className="neo-accordion__header-text"
                aria-expanded={isActive ? "true" : "false"}
                aria-controls={ariaControlText}
                aria-labelledby="accordion-Heading"
                // id={id}
                onClick={() => setIsActive(!isActive)}
              >
                {header}
              </button>
            )
          )}
        </div>

        {isActive && !disabled && (
          <div
            id={ariaControlText}
            className="neo-accordion__body"
            role="region"
            aria-label={ariaLabelText}
          >
            <div className="neo-accordion__content">{children}</div>
          </div>
        )}
      </div>
    </div>
  );
};
