import clsx from "clsx";
import {
  FC,
  ReactNode,
  useState,
  useEffect,
  ReactComponentElement,
} from "react";
import { genId } from "utils";

export interface AccordionProps {
  header: ReactNode;
  id?: string;
  defaultExpanded?: boolean;
  disabled?: boolean;
  "aria-level"?: number;
  "aria-label"?: string;
  isOpen?: boolean;
  handleClick?: (id?: string | number) => void;
}

export const Accordion: FC<AccordionProps> = ({
  header,
  id = genId(),
  defaultExpanded = false,
  disabled = false,
  "aria-level": ariaLevel = 2,
  "aria-label": ariaLabel = "Accordion Heading",
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
          <button
            className="neo-accordion__header-text"
            aria-expanded={isActive ? "true" : "false"}
            aria-controls="accordion-panel"
            id={id}
            onClick={
              handleClick ? () => handleClick() : () => setIsActive(!isActive)
            }
            disabled={disabled !== false}
          >
            {header}
          </button>
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
