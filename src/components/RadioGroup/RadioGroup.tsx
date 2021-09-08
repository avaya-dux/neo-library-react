import { useCallback, useEffect, useMemo, useState } from "react";

import { Radio, RadioProps } from "./Radio";

// TODO-564 Theme (NeoProvider): should not be adding this import in individual components
import "@avaya/neo/neo/dist/css/neo/neo.min.css";

export interface RadioGroupProps {
  radios: RadioProps[];
  groupName: string;
  checked: string;
  inline?: boolean;
  helperText?: string;
  error?: boolean;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RadioGroup = ({
  radios,
  groupName,
  checked,
  inline,
  helperText,
  error,
  required,
  onChange,
}: RadioGroupProps) => {
  const [selectedValue, setSelectedValue] = useState(checked || "");

  useEffect(() => {
    setSelectedValue(checked);
  }, [checked]);

  const formGroupClass = useMemo(() => {
    const classNames = ["neo-form-control"];

    if (error === true) {
      classNames.push("neo-form-control--error");
    }
    if (required === true) {
      classNames.push("neo-form-control--required");
    }

    return classNames.join(" ");
  }, [error, required]);

  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedValue(e.target.value);
      if (onChange) {
        onChange(e);
      }
    },
    [onChange, setSelectedValue]
  );

  const radioButtons = () => {
    return (
      <>
        {radios
          ? radios.map((radio, index) => {
              return (
                <Radio
                  key={index}
                  label={radio.label}
                  value={radio.value}
                  name={groupName}
                  selected={selectedValue}
                  tooltip={radio.tooltip}
                  position={radio.position}
                  describedBy={helperText}
                  disabled={radio.disabled}
                  onChange={onChangeHandler}
                />
              );
            })
          : null}
      </>
    );
  };

  return (
    <div className={formGroupClass} data-testid="RadioGroup-root">
      <div className="neo-input-group">
        <label htmlFor={groupName}>{groupName}</label>
        {inline ? (
          <div className="neo-input-group--inline">{radioButtons()}</div>
        ) : (
          <>{radioButtons()}</>
        )}
        {helperText && <div className="neo-input-hint">{helperText}</div>}
      </div>
    </div>
  );
};
