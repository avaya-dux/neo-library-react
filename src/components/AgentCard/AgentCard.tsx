import clsx from "clsx";
import { AvatarProps } from "components/Avatar";
import { ReactElement } from "react";
import { Timer } from "./Timer";
export interface AgentCardProps {
  label: string;
  agentState: "connected" | "not-ready" | "ready";
  imgSrc?: string;
  avatar?: ReactElement<AvatarProps>;
}

export const AgentCard = ({ label, agentState, avatar }: AgentCardProps) => {
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

  return (
    <>
      <div
        className={clsx(
          "neo-nav-status",
          agentState === "ready" && "neo-nav-status--ready",
          agentState === "not-ready" && "neo-nav-status--not-ready",
          agentState === "connected" && "neo-nav-status--connected"
        )}
      >
        <div className="neo-nav-status-info">
          <p>{label}</p>
          <span
            className={clsx(
              "neo-label",
              agentState === "ready" && "neo-label--ready",
              agentState === "not-ready" && "neo-label--not-ready",
              agentState === "connected" && "neo-label--connected"
            )}
          >
            {agentState === "ready" && "Ready"}
            {agentState === "not-ready" && "Not Ready"}
            {agentState === "connected" && "Connected"} {"  "}
            <Timer agentState={agentState} />
          </span>
        </div>
        {avatar}
      </div>
    </>
  );
};
