import { CheckboxProps } from "components/Checkbox";

export const DefaultCheckboxArray: CheckboxProps[] = [
  {
    label: "Check 1",
    value: "Check 1",
    onChange: () => {},
  },
  {
    label: "Check 2",
    value: "Check 2",
    onChange: () => {},
  },
  {
    label: "Check 3",
    value: "Check 3",
    id: "checkbox-id",
    onChange: () => {},
  },
  {
    label: "Check 4",
    value: "Check 4",
    onChange: () => {},
    disabled: true,
  },
  {
    label: "Check 5",
    value: "Check 5",
    onChange: () => {},
    tooltip: { label: "Tooltip for Check", position: "bottom" },
  },
  {
    label: "Check 6",
    value: "Check 6",
    disabled: true,
    checked: "indeterminate",
    onChange: () => {},
  },
  {
    label: "Check 7",
    value: "Check 7",
    disabled: true,
    checked: "indeterminate",
    onChange: () => {},
  },
];
