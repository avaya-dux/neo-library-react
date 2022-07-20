import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export type SwitchChangeHandler = (
  event: React.ChangeEvent<HTMLInputElement>,
  checked: boolean
) => any;

export interface SwitchProps
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    "onChange"
  > {
  error?: boolean;
  multiline?: boolean;
  contentPlacement?: "left" | "right";
  onChange?: React.ChangeEventHandler<HTMLInputElement> | SwitchChangeHandler;
}
