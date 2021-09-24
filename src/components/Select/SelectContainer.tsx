import { LayoutType } from "./SelectTypes";

export interface SelectContainerProps {
  layout: LayoutType;
  children: React.ReactNode;
  selectId: string;
  hintId: string;
  value?: string | ReadonlyArray<string> | number | undefined;
  ref?: React.Ref<HTMLSelectElement> | React.Ref<HTMLDivElement>;
}

export const SelectContainer: React.FC<SelectContainerProps> = ({
  layout,
  children,
  selectId,
  ref,
  hintId,
  ...rest
}: SelectContainerProps) => {
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
      className="neo-multiselect neo-multiselect--active"
      tabIndex={0}
      role="combobox"
      aria-haspopup="listbox"
      aria-expanded="false"
      aria-controls="listbox"
      aria-describedby={hintId}
    >
      <div className="neo-multiselect__header">{rest.value}</div>
      <div className="neo-multiselect__content">
        <ul id="listbox">{children}</ul>
      </div>
    </div>
  );
};
