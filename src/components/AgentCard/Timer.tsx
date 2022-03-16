import { useRef, useState, useEffect } from "react";
export interface TimerProps {
  agentState: string;
}

export const Timer = ({ agentState }: TimerProps) => {
  const [count, setCount] = useState(0);
  const timerIdRef = useRef<NodeJS.Timeout | null | number>(null);
  const hour: number | string = Math.floor(count / 3600);
  const minute: number | string = Math.floor((count - hour * 3600) / 60);
  const seconds: number | string = count - (hour * 3600 + minute * 60);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerIdRef.current as NodeJS.Timeout);
  }, [agentState]);

  const startTimer = () => {
    console.log("startTimer");
    setCount(0);
    if (timerIdRef.current) {
      clearInterval(timerIdRef.current as NodeJS.Timeout);
      timerIdRef.current = 0;
    }
    timerIdRef.current = setInterval(() => setCount((c) => c + 1), 1000);
  };

  return (
    <>
      {hour < 10 ? `${"0"}${hour}` : hour}:
      {minute < 10 ? `${"0"}${minute}` : minute}:
      {seconds < 10 ? `${"0"}${seconds}` : seconds}
    </>
  );
};
