import {
  getPreviousTabToMoveRight,
  getNextTabToMoveLeft,
  moveNextTabToLeftAmount,
} from "./Helper";

describe(getPreviousTabToMoveRight, () => {
  it("when leftOffset = 0, should return index [-1, 0]", () => {
    expect(getPreviousTabToMoveRight(0, [100, 100])).toEqual([-1, 0]);
  });
  it("when leftOffset === first tab width, should return [0, 0]", () => {
    expect(getPreviousTabToMoveRight(100, [100, 100])).toEqual([0, 0]);
  });
  it("when leftOffset is greater than first tab width, should return [1, 50]", () => {
    expect(getPreviousTabToMoveRight(150, [100, 100])).toEqual([1, 50]);
  });
  it("when leftOffset === all tab widths, should return [1, 0]", () => {
    expect(getPreviousTabToMoveRight(200, [100, 100])).toEqual([1, 0]);
  });
  it("when leftOffset > all tab widths, should return [1, -100]", () => {
    expect(getPreviousTabToMoveRight(300, [100, 100])).toEqual([1, -100]);
  });
});

describe(getNextTabToMoveLeft, () => {
  it("when leftOffset + viewPortWidth === sum of all tab widths, should return [3, 0]", () => {
    expect(getNextTabToMoveLeft(100, 100, [50, 50, 50, 50])).toEqual([3, 0]);
  });
  it("when leftOffset + viewPortWidth >  sum of all tab widths, should return [3, -100]", () => {
    expect(getNextTabToMoveLeft(100, 200, [50, 50, 50, 50])).toEqual([3, -100]);
  });
  it("when leftOffset + viewPortWidth === 160, should return 3", () => {
    expect(getNextTabToMoveLeft(60, 100, [50, 50, 50, 50])).toEqual([3, 40]);
  });
  it("when leftOffset + viewPortWidth === 150, should return 2", () => {
    expect(getNextTabToMoveLeft(50, 100, [50, 50, 50, 50])).toEqual([2, 0]);
  });
  it("when leftOffset + viewPortWidth === 100, should return 1", () => {
    expect(getNextTabToMoveLeft(0, 100, [50, 50, 50, 50])).toEqual([1, 0]);
  });
});

describe(moveNextTabToLeftAmount, () => {
  it("Right most tab is shown, can not move left any further should return 0", () => {
    expect(moveNextTabToLeftAmount(300, 400, 100, [100, 100, 100, 100])).toBe(
      0
    );
  });
});
