import { composeStories } from "@storybook/testing-react";
import { axe } from "jest-axe";
import { AgentCard, initialLetters } from "./AgentCard";
import { getByText, render } from "@testing-library/react";
import * as AgentCardStories from "./AgentCard.stories";

describe("AgentCard", () => {
  const AgentCardName = "Joan Barnett";
  const AgentInitials = "JB";

  it("render without errors", () => {
    const { getByText } = render(
      <AgentCard
        isReady={true}
        isConnected={false}
        isNotReady={false}
        label={AgentCardName}
      />
    );
    const AgentCardElement = getByText(AgentCardName);
    expect(AgentCardElement).toBeInTheDocument();
  });
  it("passes basic axe compliance", async () => {
    const { container } = render(
      <AgentCard
        isReady={true}
        isConnected={false}
        isNotReady={false}
        label={AgentCardName}
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it("render initials correctly", () => {
    const { container } = render(
      <AgentCard
        isReady={true}
        isConnected={false}
        isNotReady={false}
        label={AgentCardName}
      />
    );
    const AgentCardElement = container.querySelector('[data-initials="JB"]');
    expect(AgentCardElement).toBeInTheDocument();
  });

  it("render css according to attributes", () => {
    const { container } = render(
      <AgentCard
        isReady={false}
        isConnected={true}
        isNotReady={false}
        label={AgentCardName}
      />
    );
    const AgentCardElement = container.querySelector('.neo-nav-status--connected');
    expect(AgentCardElement).toBeInTheDocument();
  });
  it("render text according to passed attributes", () => {
    const { getByText } = render(
      <AgentCard
        isReady={false}
        isConnected={false}
        isNotReady={true}
        label={AgentCardName}
      />
    );
    const AgentCardElement = getByText('Not Ready');
    expect(AgentCardElement).toBeInTheDocument();
  });
  describe("storybook tests", () => {
    describe("AgentCard", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<AgentCard />);
      });

      it("should render ok", () => {
        const { container } = renderResult;
        expect(container).not.toBe(null);
      });

      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });
  });
});
