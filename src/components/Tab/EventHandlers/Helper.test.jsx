import {
  moveNextTabToLeftAmount,
  movePreviousTabToRightAmount,
} from "./Helper";

import {
  canMovePreviousTabToRight,
  getPreviousTabToMoveRight,
  calculateRightMoveAmount,
  canMoveNextTabToLeft,
  getNextTabToMoveLeft,
  calculateLeftMoveAmount,
} from "./ScrollHelper";

jest.mock("./ScrollHelper");

describe("Tab -> EventHandlers -> Helper", () => {
  describe(movePreviousTabToRightAmount, () => {
    it("when canMovePreviousTabToRight is false, should return 0", () => {
      canMovePreviousTabToRight.mockImplementation(() => false);
      expect(movePreviousTabToRightAmount(100, 200, 50, [])).toEqual(0);
      expect(canMovePreviousTabToRight).toBeCalledWith(100, 200, 50);
    });
    it("when canMovePreviousTabToRight is true, should call getPreviousTabToMoveRight and calculateRightMoveAmount correctly", () => {
      const leftOffset = 100;
      const containerWidth = 200;
      const viewPortWidth = 500;
      const retOfGetPreviousTabToMoveRight = [0, 100];
      const retOfCalculateRightMoveAmount = 100;
      const tabWidths = [];
      canMovePreviousTabToRight.mockImplementation(() => true);
      getPreviousTabToMoveRight.mockImplementation(
        () => retOfGetPreviousTabToMoveRight
      );
      calculateRightMoveAmount.mockImplementation(
        () => retOfCalculateRightMoveAmount
      );
      expect(
        movePreviousTabToRightAmount(
          leftOffset,
          containerWidth,
          viewPortWidth,
          []
        )
      ).toBe(retOfCalculateRightMoveAmount);
      expect(getPreviousTabToMoveRight).toBeCalledWith(leftOffset, tabWidths);
      expect(calculateRightMoveAmount).toBeCalledWith(
        ...retOfGetPreviousTabToMoveRight,
        tabWidths
      );
    });
  });
  describe(moveNextTabToLeftAmount, () => {
    it("Right most tab is shown, can not move left any further should return 0", () => {
      expect(moveNextTabToLeftAmount(300, 400, 100, [100, 100, 100, 100])).toBe(
        0
      );
    });
  });
});
