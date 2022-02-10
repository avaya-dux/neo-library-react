import {
  getPreviousTabToMoveRight,
  getNextTabToMoveLeft,
  calculateLeftMoveAmount,
  calculateRightMoveAmount,
} from "./ScrollHelper";

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

describe(calculateLeftMoveAmount, () => {
  it("when overshoot = 0, should return full tab width", () => {
    const tabWidth = 567;
    expect(calculateLeftMoveAmount(1, 0, [100, tabWidth, 100, 100])).toBe(
      tabWidth
    );
  });
  it("when overshoot is more than half tab width and previous tab exists, should return tabWidth - overshoot + previous tab width", () => {
    const tabWidth = 500;
    const overshoot = 500 / 2 + 50;
    const previousTabWidth = 100;
    expect(
      calculateLeftMoveAmount(1, overshoot, [
        previousTabWidth,
        tabWidth,
        200,
        300,
      ])
    ).toBe(tabWidth - overshoot + previousTabWidth);
  });

  it("when overshoot is more than half tab width and there is no previous tab, should return tabWidth - overshoot", () => {
    const tabWidth = 500;
    const overshoot = 500 / 2 + 50;
    expect(calculateLeftMoveAmount(0, overshoot, [tabWidth, 200, 300])).toBe(
      tabWidth - overshoot
    );
  });
});

describe(calculateRightMoveAmount, () => {
  it("when overshoot = 0, should return full tab width", () => {
    const tabWidth = 567;
    expect(calculateRightMoveAmount(1, 0, [100, tabWidth, 100, 100])).toBe(
      tabWidth
    );
  });
  it("when overshoot is more than half tab width and next tab exists, should return tabWidth - overshoot + next tab width", () => {
    const tabWidth = 500;
    const overshoot = 500 / 2 + 50;
    const nextTabWidth = 100;
    expect(
      calculateRightMoveAmount(1, overshoot, [100, tabWidth, nextTabWidth, 300])
    ).toBe(tabWidth - overshoot + nextTabWidth);
  });

  it("when overshoot is more than half tab width and there is no next tab, should return tabWidth - overshoot", () => {
    const tabWidth = 500;
    const overshoot = 500 / 2 + 50;
    expect(calculateRightMoveAmount(2, overshoot, [200, 300, tabWidth])).toBe(
      tabWidth - overshoot
    );
  });
});
