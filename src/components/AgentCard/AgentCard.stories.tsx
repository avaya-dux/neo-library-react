import { Meta, Story } from "@storybook/react/types-6-0";
import { AgentCard, AgentCardProps, Timer } from "./AgentCard";
import userpic from "./testimage.png";
import { Avatar } from "components/Avatar";

export default {
  title: "Components/AgentCard",
  component: AgentCard,
} as Meta<AgentCardProps>;

const initialLetters = (name: string) => {
  if (!name) {
    return "";
  }
  const nameToArray = name.split(" ");
  const initialsOfFirstLast =
    nameToArray[0].charAt(0).toUpperCase() +
    nameToArray[1].charAt(0).toUpperCase();
  return initialsOfFirstLast;
};

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
      timer={<Timer count={0} />}
    />
  </div>
);

export const TemplatedExample = Template.bind({
  label: "example Text",
  agentState: "connected",
  imgSrc: "https://placekitten.com/g/200/300",
});
TemplatedExample.args = {
  label: "example Text",
  imgSrc: "https://placekitten.com/g/200/300",
};
