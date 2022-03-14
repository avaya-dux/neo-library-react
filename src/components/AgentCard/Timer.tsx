import { useRef, useState, useEffect } from "react";
export interface TimerProps{
  status:"connected"|"ready"|"not ready";
}
export const Timer = ({status}:TimerProps) => {
  
  const timerIdRef = useRef<NodeJS.Timeout | null | number>(null);
  const [count, setCount] = useState(0);
  const hour: number | string = Math.floor(count / 3600);
  const minute: number | string = Math.floor((count - hour * 3600) / 60);
  const seconds: number | string = count - (hour * 3600 + minute * 60);

  const startHandler = () => {
    if (timerIdRef.current) {
      return;
    }
    timerIdRef.current = setInterval(() => setCount((c) => c + 1), 1000);
  };
  const stopHandler = () => {
    clearInterval(timerIdRef.current as NodeJS.Timeout);
    timerIdRef.current = 0;
  };
  useEffect(() => {
    startHandler();
    return () => clearInterval(timerIdRef.current as NodeJS.Timeout);
  }, [status]);
  return (
    <>
      <span>
        {hour < 10 ? `${"0"}${hour}` : hour}:
        {minute < 10 ? `${"0"}${minute}` : minute}:
        {seconds < 10 ? `${"0"}${seconds}` : seconds}
      </span>
      {/* Below start and stop button are used to start and stop the timer */}
      {/* <div>
        <button onClick={startHandler}>Start</button>
        <button onClick={stopHandler}>Stop</button>
      </div> */}
    </>
  );
};
