import {
  Button,
  NeoThemeProvider,
  NeoThemeProviderProps,
  Switch,
  useNeoTheme,
} from "@avaya/neo-react";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "Components/Neo Theme Provider",
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

      <Button variant="primary" status="default">
        Primary Default
      </Button>
      <Button variant="primary" status="success">
        Primary Success
      </Button>
      <Button variant="secondary" status="info">
        Secondary Info
      </Button>
      <Button variant="secondary" status="warning">
        Secondary Warning
      </Button>
      <Button variant="tertiary" status="alert">
        Tertiary Alert
      </Button>
      <Button variant="tertiary" status="event">
        Tertiary Event
      </Button>
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
