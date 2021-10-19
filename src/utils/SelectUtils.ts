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

export const getOption = (array: OptionType[], query: string[]) => {
  return array.filter((item) => {
    return query.includes(item.value);
  });
};

export const getSelectedItems = (
  isMultipleSelect: boolean,
  value: string,
  selectedItems: OptionType[],
  options: OptionType[]
) => {
  let result: OptionType[] = [];

  if (isMultipleSelect) {
    const newValue = selectedItems.find((item) => item.value === value);
    // remove new value if is already there
    if (newValue) {
      const copy = [...selectedItems];
      // do not remove if only one item was left

      if (copy.length >= 2) {
        copy.splice(copy.indexOf(newValue), 1);
        result = copy;
      }
    } else {
      // add
      result = [...selectedItems, ...getOption(options, [value])];
    }
  } else {
    result = getOption(options, [value]);
  }

  return result;
};
