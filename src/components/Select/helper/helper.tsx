import { OptionType } from "components/Select/SelectTypes";

const renderMessages = (errorList: string[]) => {
  return errorList.map((text, index) => (
    <div className="neo-input-hint" key={`${text}-${index}`}>
      {text}
    </div>
  ));
};

/**
 * @param {OptionType[]} array
 * @param {string[]} query
 * @returns {OptionType[]} Selected value or values if it/they exist
 *
 * @example
 * getOptionByValue([{ label: "Alabama", value: "AL" }, { label: "Alaska", value: "AK" }], ["AL"]); // result: [{ label: "Alabama", value: "AL" }]
 * getOptionByValue([{ label: "Alabama", value: "AL" }, { label: "Alaska", value: "AK" }], ["WA"]); // result: []
 */
export const getOptionByValue = (
  array: OptionType[],
  query: string[]
): OptionType[] =>
  array.filter((item) => {
    return query
      .map((queryItem) => queryItem.toLowerCase())
      .includes(item.value.toLowerCase());
  });

export const getDefaultOption = (array: OptionType[], placeholder: string) => {
  const defaultValue = array
    ? array.filter((item) => item.defaultSelected)
    : [];
  return defaultValue.length > 0
    ? defaultValue
    : [{ label: placeholder, value: "0" }];
};

/**
 * Builds error messages JSX if they exist, otherwise builds helper messages JSX
 *
 * @param {string[]} [errorMessages]
 * @param {string[]} [helperMessages]
 * @returns {JSX.Element[] | null}
 *
 * @example
 * displayErrorOrHelper(["Error 1", "Error 2"],[]); // result: error messages as JSX[]
 *
 * displayErrorOrHelper([],["Helper 1", "Helper 2"]); // result: helper messages as JSX[]
 */
export const displayErrorOrHelper = (
  errorMessages?: string[],
  helperMessages?: string[]
): JSX.Element[] | null => {
  return errorMessages && errorMessages.length > 0
    ? renderMessages(errorMessages)
    : helperMessages && helperMessages.length > 0
    ? renderMessages(helperMessages)
    : null;
};
