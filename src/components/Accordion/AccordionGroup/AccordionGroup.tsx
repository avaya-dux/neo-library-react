import { ReactElement, FC, useState, cloneElement } from "react";
import { AccordionProps } from "../Accordion";
import "./AccordionGroup_shim.css";

export interface AccordionGroupProps {
  allowOnlyOneExpand?: boolean;
  groupHeading: string;
  defaultOpen?: number;
  children: ReactElement<AccordionProps>[];
  handleClickParent?: () => void;
}
export const AccordionGroup: FC<AccordionGroupProps> = ({
  allowOnlyOneExpand = false,
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
        const checkId = index === currentId ? true : false;
        if (allowOnlyOneExpand) {
          return cloneElement(child, {
            key: key,
            handleClick: () => handleClickParent(index),
            isOpen: checkId,
            allowOnlyOneExpand: true,
          });
        } else {
          return cloneElement(child, {key: key});
        }
      })}
    </div>
  );
};
