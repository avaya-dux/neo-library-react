import { Props } from "./ExampleComponentTypes";

export const ExampleComponent = ({ text = "no string passed" }: Props) => {
  return (
    <div data-testid="ExampleComponent-root">Example Component: {text}</div>
  );
};
