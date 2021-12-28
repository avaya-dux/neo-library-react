import {
  Dispatch,
  FocusEvent,
  KeyboardEvent,
  RefObject,
  SetStateAction,
} from "react";

import {
  OptionType,
  SelectHandlerType,
  setSelectedOptionsType,
} from "components/Select/SelectTypes";
import { Keys } from "utils";

export const SelectOnKeyDownHandler = (
  e: KeyboardEvent<HTMLDivElement>,
  isOpen: boolean,
  options: OptionType[],
  listBoxRef: RefObject<HTMLDivElement>,
  hoveredIndex: number,
  isMultipleSelect: boolean,
  expandOrCloseOptionList: () => void,
  forceExpandOrCloseOptionList: (isOpen: boolean) => void,
  updateHoveredIndex: Dispatch<SetStateAction<number>>,
  setSelectedOptions: setSelectedOptionsType,
  updateSelectedOptions: Dispatch<SetStateAction<OptionType[]>>,
  selectedOptions: OptionType[],
  onSelectionChange?: SelectHandlerType
) => {
  const scrollHeight = listBoxRef.current?.scrollHeight;
  const itemHeight = Math.ceil(
    scrollHeight ? scrollHeight / options.length : 28
  );

  switch (e.key) {
    case Keys.SPACE: {
      forceExpandOrCloseOptionList(!isOpen);
      break;
    }

    case Keys.ESC: {
      forceExpandOrCloseOptionList(false);
      break;
    }

    case Keys.DOWN: {
      if (isOpen) {
        const currentIndex = hoveredIndex + 1;
        let resetIndex = 0;
        if (currentIndex >= options.length) {
          updateHoveredIndex(resetIndex);
        } else {
          resetIndex = currentIndex;
          updateHoveredIndex(resetIndex);
        }

        if (scrollHeight && itemHeight) {
          listBoxRef.current.scrollTop = resetIndex * itemHeight;
        }
      } else {
        expandOrCloseOptionList();
      }

      break;
    }

    case Keys.UP: {
      if (isOpen) {
        const currentIndex = hoveredIndex - 1;
        let resetIndex = options.length - 1;
        if (currentIndex < 0) {
          updateHoveredIndex(resetIndex);
        } else {
          resetIndex = currentIndex;
          updateHoveredIndex(resetIndex);
        }
        if (scrollHeight && itemHeight) {
          listBoxRef.current.scrollTop = resetIndex * itemHeight;
        }
      } else {
        expandOrCloseOptionList();
      }
      break;
    }

    case Keys.ENTER: {
      if (isOpen) {
        // value "0" will be ignored
        const newValue = [options[hoveredIndex]];
        const value = options[hoveredIndex]?.value;
        if (!options[hoveredIndex]?.isDisabled && value && value !== "0") {
          setSelectedOptions(
            isMultipleSelect,
            options,
            selectedOptions,
            updateHoveredIndex,
            updateSelectedOptions,
            newValue,
            onSelectionChange
          );
        }
        expandOrCloseOptionList();
      } else {
        expandOrCloseOptionList();
      }

      break;
    }

    default:
      break;
  }
};

export const SelectOnBlurHandler = (
  e: FocusEvent<HTMLDivElement>,
  updateIsOpen: Dispatch<SetStateAction<boolean>>
) => {
  const value = (e.relatedTarget as HTMLDivElement)?.getAttribute("data-value");

  if (!value) {
    updateIsOpen(false);
  }
};
