import clsx from "clsx";
import { useState } from "react";
import { genId } from "utils";

export interface AccordionProps {
  header: string;
  body: string;
  id?: string;
  isExpanded?: boolean;
  isDisabled?: boolean;
}
export const Accordion = ({
  header,
  body,
  id = genId(),
  isExpanded = false,
  isDisabled,
}: AccordionProps) => {
  const [isActive, setIsActive] = useState(isExpanded);
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
            isDisabled && "neo-accordion__header--disabled"
          )}
          role="heading"
          aria-label="Accordion Heading"
          aria-level={1}
        >
          {isDisabled ? (
            <button
              className="neo-accordion__header-text"
              aria-disabled
              disabled
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

        {isActive && !isDisabled && (
          <div
            id="accordion-panel"
            className="neo-accordion__body"
            role="region"
          >
            <div className="neo-accordion__content">
              <p>{body}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
