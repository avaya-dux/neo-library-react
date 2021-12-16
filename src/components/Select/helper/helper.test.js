import {
  errorMessagesDemo,
  helperMessagesDemo,
  listOfStates,
} from "components/Select/SampleData";

import {
  displayErrorOrHelper,
  getPlaceholder,
  getOptionByValue,
} from "./helper";

describe("Helper test ", () => {
  describe(getPlaceholder, () => {
    it("Given an empty array should return the default placeholder", () => {
      expect(getPlaceholder([], "This is the default placeholder"))
        .toMatchInlineSnapshot(`
        Object {
          "isPlaceholder": true,
          "label": "This is the default placeholder",
          "value": "0",
        }
      `);
    });
    it("Should return the placeholder located at the option list instead of default", () => {
      expect(getPlaceholder(listOfStates, "This is the default placeholder"))
        .toMatchInlineSnapshot(`
        Object {
          "isDisabled": false,
          "isPlaceholder": true,
          "label": "--Please choose an option--",
          "value": "0",
        }
      `);
    });
  });

  describe(getOptionByValue, () => {
    it("Given a list of states with the query (AL, UT) should return Alabama and Utah", () => {
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

  describe(displayErrorOrHelper, () => {
    it("Given undefined values, should return undefined", () => {
      expect(displayErrorOrHelper(undefined, undefined)).toMatchInlineSnapshot(
        `undefined`
      );
    });

    it("Given a ErrorMessagesDemo and HelperMessagesDemo, should return the list of errors messages", () => {
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

    it("Given only ErrorMessagesDemo, should return the list of errors messages", () => {
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

    it("Given only HelperMessagesDemo, should return the list of help messages", () => {
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
