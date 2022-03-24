import clsx from "clsx";
import { AvatarProps } from "components/Avatar";
import { ReactElement } from "react";
import { Timer } from "./Timer";
export interface AgentCardProps {
  agentName: string;
  agentStatus: "connected" | "not-ready" | "ready";
<<<<<<< HEAD
  // imgSrc?: string;
=======
>>>>>>> e4e12e361ddb6aba5d38656d2d6fb5c89aba4eda
  avatar?: ReactElement<AvatarProps>;
}

export const AgentCard = ({
  agentName,
  agentStatus,
  avatar,
}: AgentCardProps) => {
  return (
    <div
      className={clsx(
        "neo-nav-status",
        agentStatus === "ready" && "neo-nav-status--ready",
        agentStatus === "not-ready" && "neo-nav-status--not-ready",
        agentStatus === "connected" && "neo-nav-status--connected"
      )}
    >
      <div className="neo-nav-status-info">
        <p>{agentName}</p>
        <span
          className={clsx(
            "neo-label",
            agentStatus === "ready" && "neo-label--ready",
            agentStatus === "not-ready" && "neo-label--not-ready",
            agentStatus === "connected" && "neo-label--connected"
          )}
        >
          {agentStatus === "ready" && "Ready"}
          {agentStatus === "not-ready" && "Not Ready"}
          {agentStatus === "connected" && "Connected"} {"  "}
          <Timer agentStatus={agentStatus} />
        </span>
      </div>
      {avatar}
    </div>
  );
};
