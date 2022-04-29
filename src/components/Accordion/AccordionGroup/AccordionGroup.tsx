import { ReactElement, FC, useState, cloneElement } from "react";
import { AccordionProps } from "../Accordion";
import "./AccordionGroup_shim.css";

export interface AccordionGroupProps {
  allowOnlyOne?: boolean;
  groupHeading?: string;
  defaultOpen?: number;
  children: ReactElement<AccordionProps>[];
}
export const AccordionGroup: FC<AccordionGroupProps> = ({
  allowOnlyOne = false,
  groupHeading,
  defaultOpen = 0,
  children,
}) => {
  const childrenAsArray = Array.isArray(children) ? children : [children];
  const [openAccordionIndex, setOpenAccordionIndex] = useState(defaultOpen);
  return (
    <div className="neo-accordion-group">
      <p>{groupHeading}</p>
      {childrenAsArray.map((child, index) => {
        const key: number = index;
        const isOpen = index === openAccordionIndex;
        if (allowOnlyOne) {
          return cloneElement(child, {
            key: key,
            handleClick: () => setOpenAccordionIndex(index),
            isOpen: isOpen,
            allowOnlyOne: true,
          });
        } else {
          return cloneElement(child, { key: key });
        }
      })}
    </div>
  );
};
