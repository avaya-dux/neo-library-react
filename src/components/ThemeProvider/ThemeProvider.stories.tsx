import { Meta } from "@storybook/react/types-6-0";

import {
  Button,
  Switch,
  NeoThemeProvider,
  NeoThemeProviderProps,
  useNeoTheme,
} from "@avaya-neo/react";

export default {
  title: "Components/NeoThemeProvider",
  component: NeoThemeProvider,
} as Meta<NeoThemeProviderProps>;

/**
 * This is component exists separate from demo because the
 * `useTheme()` must be in a child scope of `NeoThemeProvider.
 */
const ChildDemoComponent = () => {
  const { mode, setMode } = useNeoTheme();
  return (
    <>
      <div style={{ marginBottom: 20 }}>Current Mode: {mode}</div>

      <Switch
        label="Toggle Darkmode"
        checked={mode === "dark"}
        onChange={(_, checked) => setMode(checked ? "dark" : "light")}
      />

      <Button variant="primary" status="default" label="Primary Default" />
      <Button variant="primary" status="success" label="Primary Success" />
      <Button variant="secondary" status="info" label="Secondary Info" />
      <Button variant="secondary" status="warning" label="Secondary Warning" />
      <Button variant="tertiary" status="alert" label="Tertiary Alert" />
      <Button variant="tertiary" status="event" label="Tertiary Event" />
    </>
  );
};

export const Default = () => {
  return (
    <NeoThemeProvider>
      <ChildDemoComponent />
    </NeoThemeProvider>
  );
};
