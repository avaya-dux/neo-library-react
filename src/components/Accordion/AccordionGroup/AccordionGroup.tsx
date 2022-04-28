import { ReactElement, FC, useState, cloneElement } from "react";
import { AccordionProps } from "../Accordion";
import "./AccordionGroup_shim.css";

export interface AccordionGroupProps {
  allowOnlyOneToExpand?: boolean;
  groupHeading?: string;
  defaultOpen?: number;
  children: ReactElement<AccordionProps>[];
}
export const AccordionGroup: FC<AccordionGroupProps> = ({
  allowOnlyOneToExpand = false,
  groupHeading,
  defaultOpen = 0,
  children,
}) => {
  const checkChildren = Array.isArray(children) ? children : [children];
  const [currentId, setCurrentId] = useState(defaultOpen);
  const handleClickParent = (id: number) => {
    setCurrentId(id);
  };
  return (
    <div className="neo-accordion-group">
      <p>{groupHeading}</p>
      {checkChildren.map((child, index) => {
        const key: number = index;
        const checkId = index === currentId;
        if (allowOnlyOneToExpand) {
          return cloneElement(child, {
            key: key,
            handleClick: () => handleClickParent(index),
            isOpen: checkId,
            allowOnlyOneToExpand: true,
          });
        } else {
          return cloneElement(child, { key: key });
        }
      })}
    </div>
  );
};
