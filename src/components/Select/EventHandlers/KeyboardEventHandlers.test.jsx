import { createRef } from "react";

import { Keys } from "utils";

import { SelectOnKeyDownHandler } from "./KeyboardEventHandlers";

describe("Keyboard event handlers", () => {
  describe(SelectOnKeyDownHandler, () => {
    let isOpen;
    let options;
    let listBoxRef;
    let hoveredIndex;
    let isMultipleSelect;
    let expandOrCloseOptionList;
    let forceExpandOrCloseOptionList;
    let updateHoveredIndex;
    let setSelectedOptions;

    beforeEach(() => {
      isOpen = false;
      options = [
        { label: "Alabama", value: "AL" },
        { label: "Alaska", value: "AK" },
      ];
      listBoxRef = createRef();
      hoveredIndex = 1;
      expandOrCloseOptionList = jest.fn();
      forceExpandOrCloseOptionList = jest.fn();
      updateHoveredIndex = jest.fn();
      setSelectedOptions = jest.fn();
    });

    it("should do nothing when `isOpen = false`", () => {
      const e = { key: Keys.UP };

      SelectOnKeyDownHandler(
        e,
        isOpen,
        options,
        listBoxRef,
        hoveredIndex,
        isMultipleSelect,
        expandOrCloseOptionList,
        forceExpandOrCloseOptionList,
        updateHoveredIndex,
        setSelectedOptions
      );

      expect(expandOrCloseOptionList).not.toBeCalled();
      expect(forceExpandOrCloseOptionList).not.toBeCalled();
      expect(updateHoveredIndex).not.toBeCalled();
      expect(setSelectedOptions).not.toBeCalled();
    });


    describe(Keys.DOWN, () => {
      it("should expand the option list when `isOpen = false`.", () => {

        const e = { key: Keys.DOWN };

        SelectOnKeyDownHandler(
          e,
          isOpen,
          options,
          listBoxRef,
          hoveredIndex,
          isMultipleSelect,
          expandOrCloseOptionList,
          forceExpandOrCloseOptionList,
          updateHoveredIndex,
          setSelectedOptions
        );

        expect(expandOrCloseOptionList).toHaveBeenCalled();
        expect(forceExpandOrCloseOptionList).not.toBeCalled();
        expect(updateHoveredIndex).not.toBeCalled();
        expect(setSelectedOptions).not.toBeCalled();

      });
      it("should expand the option list when `isOpen = true`.", () => {

        const e = { key: Keys.DOWN };
        isOpen = true;
        SelectOnKeyDownHandler(
          e,
          isOpen,
          options,
          listBoxRef,
          hoveredIndex,
          isMultipleSelect,
          expandOrCloseOptionList,
          forceExpandOrCloseOptionList,
          updateHoveredIndex,
          setSelectedOptions
        );

        expect(expandOrCloseOptionList).not.toBeCalled();
        expect(forceExpandOrCloseOptionList).not.toBeCalled();
        expect(updateHoveredIndex).toHaveBeenCalledWith(hoveredIndex);
        expect(setSelectedOptions).not.toBeCalled();

      });
    });
  });
});
