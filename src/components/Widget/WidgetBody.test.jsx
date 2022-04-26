import { getStyle } from "./WidgetBody";

describe("WidgetBody", () => {
  describe(getStyle, () => {
    it("should return {} when all parameters are undefined", () => {
      expect(getStyle()).toEqual({});
      expect(getStyle({})).toEqual({});
    });
    it("should return {height: 100} when fixedHeight is 100", () => {
      expect(getStyle({ fixedHeight: 100 })).toEqual({ height: 100 });
    });
    it("should return {width: 100} when fixedWidth is 100", () => {
      expect(getStyle({ fixedWidth: 100 })).toEqual({ width: 100 });
    });
    it("should return {height: 100, width: 100} when fixedHeight is 100 and fixedWidth is 100", () => {
      expect(getStyle({ fixedWidth: 100, fixedHeight: 100 })).toEqual({
        height: 100,
        width: 100,
      });
    });
    it("should add height and width to style", () => {
      expect(
        getStyle({ style: { marginTop: 5 }, fixedWidth: 100, fixedHeight: 100 })
      ).toEqual({
        marginTop: 5,
        height: 100,
        width: 100,
      });
    });
    it("should overwrite height and width in style", () => {
      expect(
        getStyle({
          style: { height: 5, width: 5 },
          fixedWidth: 100,
          fixedHeight: 100,
        })
      ).toEqual({
        height: 100,
        width: 100,
      });
    });
  });
});
