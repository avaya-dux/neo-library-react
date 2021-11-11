import { OptionType } from "components/Select/SelectTypes";

const renderErrorList = (errorList: string[]) => {
  return errorList.map((text, index) => (
    <div className="neo-input-hint" key={`${text}-${index}`}>
      {text}
    </div>
  ));
};

export const getOption = (array: OptionType[], query?: string[]) =>
  array.filter((item) => {
    return query
      ? query
          .map((queryItem) => queryItem.toLowerCase())
          .includes(item.value.toLowerCase())
      : item.defaultSelected;
  });

export const displayErrorOrHelper = (
  errorMessages?: string[],
  helperMessages?: string[]
) => {
  return errorMessages
    ? renderErrorList(errorMessages)
    : helperMessages
    ? renderErrorList(helperMessages)
    : null;
};
