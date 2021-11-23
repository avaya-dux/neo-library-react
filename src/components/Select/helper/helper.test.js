import {
  errorMessagesDemo,
  helperMessagesDemo,
  listOfStates,
} from "../SampleData";
import { displayErrorOrHelper, getOption } from "./helper";

describe("Helper test ", () => {
  describe("getOption", () => {
    it("given a list of states without a query will returns the default selected", () => {
      expect(getOption(listOfStates)).toMatchInlineSnapshot(`
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

    it("given a list of states with the query (AL, UT) will returns Alabama and Utah", () => {
      expect(getOption(listOfStates, ["AL", "UT"])).toMatchInlineSnapshot(`
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
    it("given a ErrorMessagesDemo and HelperMessagesDemo, should do return the list of errors", () => {
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

    it("given only ErrorMessagesDemo, should do return the list of errors", () => {
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

    it("given only HelperMessagesDemo, should do return the list of help messages", () => {
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
