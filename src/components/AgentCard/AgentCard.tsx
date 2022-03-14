import clsx from "clsx";
import { Avatar, AvatarProps } from "components/Avatar";
import { ReactComponentElement, ReactElement } from "react";
import { Timer } from "./Timer";

export interface AgentCardProps {
  label: string;
  status: "not-ready" | "connected" | "ready";
  imgSrc?: string;
  avatar?: ReactElement<AvatarProps>;
  timer?: ReactComponentElement<typeof Timer>;
}

export const AgentCard = ({
  label,
  status,
  imgSrc,
  avatar,
  timer,
}: AgentCardProps) => {
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
          status === "ready" && "neo-nav-status--ready",
          status === "not-ready" && "neo-nav-status--not-ready",
          status === "connected" && "neo-nav-status--connected"
        )}
      >
        <div className="neo-nav-status-info">
          <p>{label}</p>
          <span
            className={clsx(
              "neo-label",
              status === "ready" && "neo-label--ready",
              status === "not-ready" && "neo-label--not-ready",
              status === "connected" && "neo-label--connected"
            )}
          >
            {status === "ready" && "Ready"}
            {status === "not-ready" && "Not Ready"}
            {status === "connected" && "Connected"} {"  "}
            {timer}
            <Timer status="connected"/>
          </span>
        </div>
        {avatar}
      </div>
    </>
  );
};
