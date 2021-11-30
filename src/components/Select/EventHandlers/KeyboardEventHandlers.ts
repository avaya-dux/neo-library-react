import {
  Dispatch,
  FocusEvent,
  KeyboardEvent,
  RefObject,
  SetStateAction,
} from "react";

import { Keys } from "utils";

import { OptionType } from "../SelectTypes";

export const SelectOnKeyDownHandler = (
  e: KeyboardEvent<HTMLDivElement>,
  isOpen: boolean,
  options: OptionType[],
  listBoxRef: RefObject<HTMLDivElement>,
  hoveredIndex: number,
  isMultipleSelect: boolean,
  expandOrCloseListBox: () => void,
  updateIsOpen: Dispatch<SetStateAction<boolean>>,
  updateHoveredIndex: Dispatch<SetStateAction<number>>,
  setSelectedOptions: (isMultipleSelect: boolean, value: string) => void
) => {
  const scrollHeight = listBoxRef.current?.scrollHeight;
  const itemHeight = Math.ceil(
    scrollHeight ? scrollHeight / options.length : 28
  );

  switch (e.key) {
    case Keys.SPACE: {
      updateIsOpen(!isOpen);
      break;
    }

    case Keys.ESC: {
      updateIsOpen(false);
      break;
    }

    case Keys.DOWN: {
      if (isOpen) {
        updateHoveredIndex((prevState) =>
          prevState < options.length - 1 ? prevState + 1 : prevState
        );
        if (scrollHeight && itemHeight) {
          listBoxRef.current.scrollTop = hoveredIndex * itemHeight;
        }
      } else {
        expandOrCloseListBox();
      }

      break;
    }

    case Keys.UP: {
      updateHoveredIndex((prevState) =>
        prevState > 1 ? prevState - 1 : prevState
      );
      if (scrollHeight && itemHeight) {
        listBoxRef.current.scrollTop = (hoveredIndex - 2) * itemHeight;
      }
      break;
    }

    case Keys.ENTER: {
      if (isOpen) {
        // value "0" will be ignored
        const value = options[hoveredIndex]?.value;
        if (!options[hoveredIndex]?.isDisabled && value !== "0") {
          setSelectedOptions(isMultipleSelect, value);
        }
        expandOrCloseListBox();
      } else {
        expandOrCloseListBox();
      }

      break;
    }

    default:
      break;
  }
};

export const SelectOnBlurHandler = (
  e: FocusEvent<HTMLDivElement>,
  setOpen: Dispatch<SetStateAction<boolean>>
) => {
  if (e.relatedTarget === null) {
    setOpen(false);
  }
};
