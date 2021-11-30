import { OptionType } from "components/Select/SelectTypes";

const renderMessages = (errorList: string[]) => {
  return errorList.map((text, index) => (
    <div className="neo-input-hint" key={`${text}-${index}`}>
      {text}
    </div>
  ));
};

/**
 * Returns OptionType[] based on Value
 * @param {OptionType[]} array
 * @param {string[]} query
 * @example
 * // returns [{ label: "Alabama", value: "AL" }]
 * getOptionValue([{ label: "Alabama", value: "AL" }, { label: "Alaska", value: "AK" }]
 * ,["AL"]);
 * @returns {OptionType[]} Selected value or values.
 */
export const getOptionValue = (
  array: OptionType[],
  query: string[]
): OptionType[] =>
  array.filter((item) => {
    return query
      .map((queryItem) => queryItem.toLowerCase())
      .includes(item.value.toLowerCase());
  });

export const getDefaultOption = (array: OptionType[]) =>
  array.filter((item) => {
    return item.defaultSelected;
  });

/**
 * Evaluate which list will be displayed (Errors | Helpers).
 * @param {string[]} errorMessages
 * @param {string[]} helperMessages
 * @example
 * // returns Error list
 * displayErrorOrHelper(["Error 1", "Error 2"],[]);
 * @example
 * // returns Helper list
 * displayErrorOrHelper([],["Helper 1", "Helper 2"]);
 * @returns {JSX.Element[] | null} Returns a list of messages.
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
