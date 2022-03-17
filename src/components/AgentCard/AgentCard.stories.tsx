import { Meta, Story } from "@storybook/react/types-6-0";
import { AgentCard, AgentCardProps } from "./AgentCard";
import userpic from "./testimage.png";
import { Avatar } from "components/Avatar";
import { connected } from "process";

export default {
  title: "Components/AgentCard",
  component: AgentCard,
} as Meta<AgentCardProps>;

const initialLetters = (name: string) => {
  if (!name) {
    return "";
  }
  const nameToArray = name.split(" ");
  if (name.length > 1) {
    const initialsOfFirstLast =
      nameToArray[0].charAt(0).toUpperCase() +
      nameToArray[1].charAt(0).toUpperCase();
    return initialsOfFirstLast;
  }
  return "";
};

export const AgentCardStory = () => (
  <>
    <div className="neo-nav">
      <AgentCard
        label={"Barbara Barberson"}
        agentState={"connected"}
        avatar={
          <Avatar
            variant="basic"
            label={"Barbara Barberson"}
            initials={initialLetters("Barbara Barberson")}
          />
        }
      />
    </div>
    <br />
    <div className="neo-nav">
      <AgentCard
        label={"Barbara Barberson"}
        agentState={"ready"}
        avatar={
          <Avatar
            variant="basic"
            label={"Barbara Barberson"}
            initials={initialLetters("Barbara Barberson")}
          />
        }
      />
    </div>
    <br />
    <div className="neo-nav">
      <AgentCard
        label={"Barbara Barberson"}
        agentState={"not-ready"}
        avatar={
          <Avatar
            variant="basic"
            label={"Barbara Barberson"}
            initials={initialLetters("Barbara Barberson")}
          />
        }
      />
    </div>
    <br />
    <div className="neo-nav">
      <AgentCard
        label={"Barbara Barberson"}
        agentState={"ready"}
        avatar={<Avatar variant="generic" label={"Barbara Barberson"} />}
      />
    </div>
    <br />
    <div className="neo-nav">
      <AgentCard
        label={"Barbara Barberson"}
        agentState={"ready"}
        avatar={
          <Avatar
            variant="generic"
            label={"Barbara Barberson"}
            image="https://placekitten.com/g/200/300"
          />
        }
      />
    </div>
  </>
);

const Template: Story<AgentCardProps> = ({
  label,
  agentState,
  imgSrc,
}: AgentCardProps) => (
  <div className="neo-nav">
    <AgentCard
      agentState={agentState}
      label={label}
      avatar={<Avatar variant="generic" size="md" image={imgSrc} />}
    />
  </div>
);

export const TemplatedAgentCard = Template.bind({});
TemplatedAgentCard.args = {
  label: "Barbara Barberson",
  agentState: "connected",
  imgSrc: "https://placekitten.com/g/200/300",
};
