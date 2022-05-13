import { useContext, useMemo } from "react";

import { SelectContext } from "../utils/SelectContext";
import { InternalSelectOption } from "./InternalSelectOption";

export const OptionsWithEmptyMessageFallback = () => {
  const {
    downshiftProps: { inputValue },
    optionProps: { createMessage, noOptionsMessage },
    selectProps: { creatable, filteredOptions },
  } = useContext(SelectContext);

  const backupOption = useMemo(
    () =>
      creatable ? (
        <InternalSelectOption index={0} key="create-option" value="create">
          {`${createMessage} '${inputValue}'`}
        </InternalSelectOption>
      ) : (
        <InternalSelectOption disabled index={0} key="no-available-options">
          {noOptionsMessage}
        </InternalSelectOption>
      ),
    [creatable, noOptionsMessage, inputValue]
  );

  return (
    <>
      {filteredOptions.length
        ? filteredOptions.map((option, index) => (
            <InternalSelectOption
              {...option}
              index={index}
              key={`internal-option-${option.value}-${index}`}
            />
          ))
        : backupOption}
    </>
  );
};
