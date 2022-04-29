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
  const [currentId, setCurrentId] = useState(defaultOpen);
  return (
    <div className="neo-accordion-group">
      <p>{groupHeading}</p>
      {childrenAsArray.map((child, index) => {
        const key: number = index;
        const isOpen = index === currentId;
        if (allowOnlyOne) {
          return cloneElement(child, {
            key: key,
            handleClick: () => setCurrentId(index),
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
