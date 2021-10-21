import { OptionType } from "components/Select/SelectTypes";
export const getSelectContainerClass = (
  displayHintAsAnError: boolean,
  disabled: boolean,
  required: boolean
) => {
  const classArray = ["neo-form-control"];

  if (displayHintAsAnError) {
    classArray.push("neo-form-control--error");
  }

  if (disabled) {
    classArray.push("neo-form-control--disabled");
  }

  if (required) {
    classArray.push("neo-form-control--required");
  }

  return classArray;
};

export const getOption = (array: OptionType[], query?: string[]) =>
  array.filter((item) => {
    return query
      ? query
          .map((queryItem) => queryItem.toLowerCase())
          .includes(item.value.toLowerCase())
      : item.defaultChecked;
  });

export const getSelectedItems = (
  isMultipleSelect: boolean,
  value: string,
  selectedItems: OptionType[],
  options: OptionType[]
) => {
  let result: OptionType[] = [];

  // remove placeholder
  const cleanSelectedItems = selectedItems.filter((item) => !item.placeholder);

  if (isMultipleSelect) {
    result = setMultipleValues(cleanSelectedItems, options, value);
  } else {
    result = getOption(options, [value]);
  }

  return result;
};

const setMultipleValues = (
  selectedItems: OptionType[],
  options: OptionType[],
  value: string
) => {
  let result: OptionType[] = [];
  const newValue = selectedItems.find((item) => item.value === value);
  // remove new value if is already there
  if (newValue) {
    const copy = [...selectedItems];
    copy.splice(copy.indexOf(newValue), 1);
    result = copy;
  } else {
    // add
    result = [...selectedItems, ...getOption(options, [value])];
  }
  return result;
};
