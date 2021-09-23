import { forwardRef, useMemo } from "react";

import { genId } from "utils/accessibilityUtils";

type LayoutType = "basic" | "standard";

type OptionType = {
  label: string;
  value: string;
};

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: OptionType[];
  hint: string;
  displayHintAsAnError?: boolean;
  layout?: LayoutType;
}

type SelectContainerProps = {
  layout: LayoutType;
  children: React.ReactNode;
  selectId: string;
  hintId: string;
  value?: string | ReadonlyArray<string> | number | undefined;
  ref?: React.Ref<HTMLSelectElement> | React.Ref<HTMLDivElement>;
};
const SelectContainer: React.FC<SelectContainerProps> = ({
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

export const Select: React.FC<SelectProps> = forwardRef(
  (
    {
      className,
      label,
      options,
      hint,
      displayHintAsAnError,
      layout = "standard",
      ...rest
    }: SelectProps,
    ref: React.Ref<HTMLSelectElement>
  ) => {
    const hintId = genId();
    const selectId = genId();

    const componentClasses = useMemo(() => {
      const classArray = ["neo-form-control"];

      if (displayHintAsAnError) {
        classArray.push("neo-form-control--error");
      }

      return [...classArray, className].join(" ");
    }, [displayHintAsAnError]);

    const renderOptions = (options: OptionType[], layout: LayoutType) => {
      return options.map((option, index) => {
        const { label, value } = option;

        return layout === "basic" ? (
          <option key={`${label}-${value}-${index}`} value={value}>
            {label}
          </option>
        ) : (
          <li
            key={`${label}-${value}-${index}`}
            tabIndex={-1}
            data-value={value}
          >
            {label}
          </li>
        );
      });
    };

    return (
      <div className={componentClasses}>
        <div className="neo-input-group">
          {label ? <label htmlFor={selectId}>{label}</label> : null}

          <SelectContainer
            layout={layout}
            selectId={selectId}
            hintId={hintId}
            ref={ref}
            {...rest}
          >
            {options ? renderOptions(options, layout) : null}
          </SelectContainer>

          <div className="neo-input-hint" id={hintId}>
            {hint}
          </div>
        </div>
      </div>
    );
  }
);
