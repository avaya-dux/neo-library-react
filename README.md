# neo-library-react

> This is the react version of the shared library called "NEO" buit by Avaya.

## Install (NOT IMPLEMENTED, example only)

```bash
yarn add neo-library-react
```

## Example Usage

Additional components available, see storybooks for examples

```tsx
import { IconNamesType, NoContent } from "neo-library-react";

export const Example = () => {
  const agentIconName: IconNamesType = "agent";
  return <NoContent icon={agentIconName} text={"Agent has no content"} />;
};
```

## Adding to this library

If you would like to contribute to this project, you can start in our [how to dev doc](./readmes/how-to-dev.md)

## License MIT

need to contact Avaya legal about this
