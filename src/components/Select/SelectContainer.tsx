import { useState, useMemo, useEffect } from "react";
import { LayoutType, OptionType, SelectHandlerType } from "./SelectTypes";

export interface SelectContainerProps {
  layout: LayoutType;
  options: OptionType[];
  children: React.ReactNode;
  selectId: string;
  onSelected?: SelectHandlerType;
  hintId: string;
  value?: string;
  ref?: React.Ref<HTMLSelectElement> | React.Ref<HTMLDivElement>;
}

export const SelectContainer: React.FC<SelectContainerProps> = ({
  layout,
  options,
  children,
  selectId,
  ref,
  hintId,
  onSelected,
  ...rest
}: SelectContainerProps) => {
  const [isOpen, updateIsOpen] = useState(false);

  const filterFunc = (array: OptionType[], query: string) => {
    return array.filter((item) => {
      console.log(item);
      return item.value === query;
    });
  };

  const defaultValue = rest.value ? filterFunc(options, rest.value) : options;
  console.log(defaultValue);
  const [internal, updateInternal] = useState(defaultValue[0]);

  useEffect(() => {
    console.log(rest.value);
    if (rest.value) {
      const selected = filterFunc(options, rest.value);
      updateInternal(selected[0]);
    }
  }, [rest.value]);

  const componentClassesStandardLayout = useMemo(() => {
    return isOpen
      ? ["neo-multiselect", "neo-multiselect--active"].join(" ")
      : "neo-multiselect";
  }, [isOpen]);

  const clickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const value = (e.target as HTMLDivElement).getAttribute("data-value");
    if (value) {
      const selected = filterFunc(options, value);
      console.log(selected, value);
      updateInternal(selected[0]);
      if (onSelected) {
        onSelected(selected[0].value);
      }
    }
    updateIsOpen(!isOpen);
  };
  console.log(internal);

  return layout === "basic" ? (
    <div className="neo-select">
      <select
        id={selectId}
        {...rest}
        ref={ref as React.Ref<HTMLSelectElement>}
        className="neo-icon-chevron-down"
        aria-describedby={hintId}
      >
        {children}
      </select>
    </div>
  ) : (
    <div
      id={selectId}
      {...rest}
      ref={ref as React.Ref<HTMLDivElement>}
      className={componentClassesStandardLayout}
      tabIndex={0}
      role="combobox"
      aria-haspopup="listbox"
      aria-expanded="false"
      aria-controls="listbox"
      aria-describedby={hintId}
      onClick={clickHandler}
      onKeyPress={(e) => console.log(e.key)}
    >
      <div className="neo-multiselect__header">{internal?.label}</div>
      <div className="neo-multiselect__content">
        <ul id="listbox">{children}</ul>
      </div>
    </div>
  );
};
