import { createRef } from "react";

import { Keys } from "utils";

import { SelectOnBlurHandler, SelectOnKeyDownHandler } from "./KeyboardEventHandlers";

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
        { label: "Arizona", value: "AZ" },
      ];
      listBoxRef = createRef();
      hoveredIndex = 1;
      isMultipleSelect = false;
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
      it("should do increase the hoverIndex by 1 when `isOpen = true`.", () => {
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
        expect(updateHoveredIndex).toHaveBeenCalledWith(hoveredIndex + 1);
        expect(setSelectedOptions).not.toBeCalled();
      });

      it("should do reset  the hoverIndex to 1 when `isOpen = true and hoverIndex >= options.length`.", () => {
        const e = { key: Keys.DOWN };
        isOpen = true;
        hoveredIndex = 3;
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
        expect(updateHoveredIndex).toHaveBeenCalledWith(1);
        expect(setSelectedOptions).not.toBeCalled();
      });
    });
    describe(Keys.UP, () => {
      it("should decrease the hoverIndex by 1 when `isOpen = true`.", () => {
        const e = { key: Keys.UP };
        isOpen = true;
        hoveredIndex = 3;
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
        expect(updateHoveredIndex).toHaveBeenCalledWith(hoveredIndex - 1);
        expect(setSelectedOptions).not.toBeCalled();
      });

      it("should reset the hoverIndex to options.length-1 when `isOpen = true and hoverIndex <= 0`", () => {
        const e = { key: Keys.UP };
        isOpen = true;
        hoveredIndex = 0;
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
        expect(updateHoveredIndex).toHaveBeenCalledWith(options.length - 1);
        expect(setSelectedOptions).not.toBeCalled();
      });
    });
    describe(Keys.ENTER, () => {
      it("should expand the option list when `isOpen = false`.", () => {
        const e = { key: Keys.ENTER };

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
      it("should return the value `AL` when `isOpen = true and hoveredIndex = 0`", () => {
        const e = { key: Keys.ENTER };
        isOpen = true;
        hoveredIndex = 0;
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
        expect(setSelectedOptions).toHaveBeenCalledWith(isMultipleSelect, "AL");
      });

      it("should close the option list  when `isOpen = true and hoverIndex < 0`", () => {
        const e = { key: Keys.ENTER };
        isOpen = true;
        hoveredIndex = -20;
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

      it("should close the option list  when `isOpen = true and hoverIndex > options.length`", () => {
        const e = { key: Keys.ENTER };
        isOpen = true;
        hoveredIndex = 20;
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
    });

    describe(SelectOnBlurHandler, () => {
      let updateIsOpen;
      beforeEach(() => {
        updateIsOpen = jest.fn();
      });
      it("should close Option list when Select lost focus", () => {
        const e = { relatedTarget: null };
        SelectOnBlurHandler(e, updateIsOpen);
        expect(updateIsOpen).toBeCalledWith(false);
      });
      it("should do nothing when Select still has focus", () => {
        const e = { relatedTarget: {} };
        SelectOnBlurHandler(e, updateIsOpen);
        expect(updateIsOpen).not.toBeCalled();
      });
    });
  });
});
