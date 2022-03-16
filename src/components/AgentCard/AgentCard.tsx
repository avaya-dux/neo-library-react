import clsx from "clsx";
import { AvatarProps } from "components/Avatar";
import { ReactElement, useRef, useState, useEffect } from "react";
import { Timer } from "./Timer";
export interface AgentCardProps {
  label: string;
  agentState: "connected" | "not-ready" | "ready";
  imgSrc?: string;
  avatar?: ReactElement<AvatarProps>;
}

export const AgentCard = ({
  label,
  agentState,
  imgSrc,
  avatar,
}: AgentCardProps) => {
  // const [agentState, setAgentState] = useState(agentState1);
  const [count, setCount] = useState(0);
  const [startStop, setStartStop] = useState(true);
  const timerIdRef = useRef<NodeJS.Timeout | null | number>(null);
  const hour: number | string = Math.floor(count / 3600);
  const minute: number | string = Math.floor((count - hour * 3600) / 60);
  const seconds: number | string = count - (hour * 3600 + minute * 60);

  useEffect(() => {
    startHandler();
    console.log("here i am");
    // setCount(0);
    return () => clearInterval(timerIdRef.current as NodeJS.Timeout);
  }, [agentState]);

  const startHandler = () => {
    console.log("starthandler");
    setCount(0);
    // if (startStop) {
    if (timerIdRef.current) {
      clearInterval(timerIdRef.current as NodeJS.Timeout);
      timerIdRef.current = 0;
      // return;
    }
    timerIdRef.current = setInterval(() => setCount((c) => c + 1), 1000);
    // setStartStop(!startStop);
    // } else {
    // setStartStop(!startStop);
    // }
  };

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
            <Timer count={count} startHandler={startHandler} />
          </span>
        </div>
        {avatar}
      </div>
    </>
  );
};
