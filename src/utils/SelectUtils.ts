import { OptionType } from "components/Select/SelectTypes";
export const getSelectContainerClass = (
  displayHintAsAnError?: boolean,
  disabled?: boolean,
  required?: boolean
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
