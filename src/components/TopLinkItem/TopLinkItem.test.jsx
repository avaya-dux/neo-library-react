import { composeStories } from "@storybook/testing-react";
import { fireEvent, render } from "@testing-library/react";
import {axe} from "jest-axe";
import { TopLinkItem } from "./TopLinkItem";
import * as TopLinkItemStories from "./TopLinkItem.stories";

const {TopLinkItem} = composeStories(TopLinkItemStories);

describe("TopLinkItem", () => {
    const TopLinkItemLabel = "label for top link";
    it("fully renders without exploding", () => {
        const {getByTest} = render(
            <ul>
                <TopLinkItem label={TopLinkItemLabel}/>
            </ul>
        )
    });
    const topLinkElement = getByTest(TopLinkItemLabel);
    expect(topLinkElement).toBeInTheDocument();
    it("passes basic axe compliance", async () => {
        const { container } = render(
          <ul>
            <TopLinkItem label={linkItemText}/>
          </ul>
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });
})