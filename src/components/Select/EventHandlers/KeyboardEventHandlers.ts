import {
  Dispatch,
  FocusEvent,
  KeyboardEvent,
  RefObject,
  SetStateAction,
} from "react";

import { Keys } from "utils";

import { OptionType } from "components/Select/SelectTypes";

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
  setSelectedOptions: (isMultipleSelect: boolean, value: string) => void
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
        let resetIndex = 1;
        if (currentIndex >= options.length) {
          updateHoveredIndex(resetIndex);
        } else {
          resetIndex = currentIndex;
          updateHoveredIndex(resetIndex);
        }

        if (scrollHeight && itemHeight) {
          listBoxRef.current.scrollTop = (resetIndex - 1) * itemHeight;
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
        if (currentIndex <= 0) {
          updateHoveredIndex(resetIndex);
        } else {
          resetIndex = currentIndex;
          updateHoveredIndex(resetIndex);
        }

        if (scrollHeight && itemHeight) {
          listBoxRef.current.scrollTop = (resetIndex - 1) * itemHeight;
        }
      }
      break;
    }

    case Keys.ENTER: {
      if (isOpen) {
        // value "0" will be ignored
        const value = options[hoveredIndex]?.value;
        if (!options[hoveredIndex]?.isDisabled && value && value !== "0") {
          setSelectedOptions(isMultipleSelect, value);
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
  if (e.relatedTarget === null) {
    updateIsOpen(false);
  }
};
