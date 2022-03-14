import { Meta, Story } from "@storybook/react/types-6-0";
import { AgentCard, AgentCardProps } from "./AgentCard";
import userpic from "./testimage.png";
import { Avatar } from "components/Avatar";
import { Timer } from "./Timer";
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
export const AgentCards = () => {
  return (
    <>
      {/* <AgentCard status="ready" label={"Joan Barnett"} />
      <br />
      <AgentCard status="connected" label={"Joan Barnett"} />
      <br />
      <AgentCard status="not-ready" label={"Joan Barnett"} />
      <br />
      <AgentCard status="connected" label={"Joan Barnett"} isImage={true} />
      <br/> */}

      <div className="neo-nav">
        <AgentCard
          status="ready"
          label={"Akhila Thota"}
          avatar={
            <Avatar
              variant="basic"
              label={"Akhila Thota"}
              initials={initialLetters("Akhila Thota")}
              size="md"
            />
          }
          timer={<Timer />}
        />
      </div>
      <div className="neo-nav">
        <AgentCard
          status="ready"
          label={"Akhila Thota"}
          avatar={
            <Avatar
              variant="generic"
              size="md"
              image="https://placekitten.com/g/200/300"
            />
          }
          timer={<Timer />}
        />
      </div>
    </>
  );
};

const Template: Story<AgentCardProps> = ({
  label,
  status,
  imgSrc,
}: AgentCardProps) => (
  <div className="neo-nav">
    <AgentCard
      status={status}
      label={label}
      avatar={<Avatar variant="generic" size="md" image={imgSrc} />}
      timer={<Timer />}
    />
  </div>
);

export const TemplatedExample = Template.bind({
  label: "example Text",
  status: "connected",
  imgSrc: "https://placekitten.com/g/200/300",
});
TemplatedExample.args = {
  label: "example Text",
  status: "connected",
  imgSrc: "https://placekitten.com/g/200/300",
};
