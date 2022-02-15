import { moveNextTabToLeftAmount } from "./Helper";

describe(moveNextTabToLeftAmount, () => {
  it("Right most tab is shown, can not move left any further should return 0", () => {
    expect(moveNextTabToLeftAmount(300, 400, 100, [100, 100, 100, 100])).toBe(
      0
    );
  });
});
