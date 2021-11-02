# Neo React Component Library

> This is the react version of the shared library called "NEO" buit by Avaya

## Install

```bash
npm i @avaya/neo-react
```

or

```bash
yarn add @avaya/neo-react
```

## Example Usage

Additional components available, see [documentation site](https://design.avayacloud.com/components/web) for more examples

```tsx
import { IconNamesType, NoContent } from "@avaya/neo-react";

export const Example = () => {
  const agentIconName: IconNamesType = "agent";
  return <NoContent icon={agentIconName} text={"Agent has no content"} />;
};
```

## Adding to this library

If you would like to contribute to this project, you can start in our [how to dev doc](./readmes/how-to-dev.md)

## License

Copyright 2020-2021 Avaya Inc. All Rights Reserved.
