import {
  errorMessagesDemo,
  helperMessagesDemo,
  listOfStates,
} from "../SampleData";
import {
  displayErrorOrHelper,
  getDefaultOption,
  getOptionByValue,
} from "./helper";

describe("Helper test ", () => {
  describe("getDefaultOption", () => {
    it("given an empty array should return an empty array", () => {
      expect(getDefaultOption([])).toMatchInlineSnapshot(`Array []`);
    });

    it("given a list of states without a query should return the default selected", () => {
      expect(getDefaultOption(listOfStates)).toMatchInlineSnapshot(`
        Array [
          Object {
            "defaultSelected": true,
            "isDisabled": false,
            "isPlaceholder": true,
            "label": "--Please choose an option--",
            "value": "0",
          },
        ]
      `);
    });

    it("given a list of states with the query (AL, UT) should return Alabama and Utah", () => {
      expect(getOptionByValue(listOfStates, ["AL", "UT"]))
        .toMatchInlineSnapshot(`
              Array [
                Object {
                  "label": "Alabama",
                  "value": "AL",
                },
                Object {
                  "label": "Utah",
                  "value": "UT",
                },
              ]
          `);
    });
  });

  describe("displayErrorOrHelper", () => {
    it("given undefined values, should return null", () => {
      expect(displayErrorOrHelper(undefined, undefined)).toMatchInlineSnapshot(
        `null`
      );
    });

    it("given a ErrorMessagesDemo and HelperMessagesDemo, should return the list of errors", () => {
      expect(displayErrorOrHelper(errorMessagesDemo, helperMessagesDemo))
        .toMatchInlineSnapshot(`
              Array [
                <div
                  className="neo-input-hint"
                >
                  Error 1: Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...
                </div>,
                <div
                  className="neo-input-hint"
                >
                  Error 2: Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...
                </div>,
              ]
          `);
    });

    it("given only ErrorMessagesDemo, should return the list of errors", () => {
      expect(displayErrorOrHelper(errorMessagesDemo, undefined))
        .toMatchInlineSnapshot(`
              Array [
                <div
                  className="neo-input-hint"
                >
                  Error 1: Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...
                </div>,
                <div
                  className="neo-input-hint"
                >
                  Error 2: Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...
                </div>,
              ]
          `);
    });

    it("given only HelperMessagesDemo, should return the list of help messages", () => {
      expect(displayErrorOrHelper(undefined, helperMessagesDemo))
        .toMatchInlineSnapshot(`
              Array [
                <div
                  className="neo-input-hint"
                >
                  Helper 1: Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...
                </div>,
                <div
                  className="neo-input-hint"
                >
                  helper 2: Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...
                </div>,
              ]
          `);
    });
  });
});
