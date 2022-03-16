export interface TimerProps {
  count: number;
  startHandler?: any;
}

export const Timer = ({ count, startHandler }: TimerProps) => {
  const hour: number | string = Math.floor(count / 3600);
  const minute: number | string = Math.floor((count - hour * 3600) / 60);
  const seconds: number | string = count - (hour * 3600 + minute * 60);
  return (
    <>
      <button onClick={startHandler}>
        {hour < 10 ? `${"0"}${hour}` : hour}:
        {minute < 10 ? `${"0"}${minute}` : minute}:
        {seconds < 10 ? `${"0"}${seconds}` : seconds}
      </button>
    </>
  );
};
