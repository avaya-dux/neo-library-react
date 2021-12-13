# Neo React Component Library

> This is the react version of the shared library called "NEO" buit by Avaya ([storybook site](https://neo-library-react-storybook.netlify.app/))

## Install

```bash
npm i @avaya/neo-react @avaya/neo
```

or

```bash
yarn add @avaya/neo-react @avaya/neo
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

If you would like to contribute to this project, you can start in our [how to dev doc](https://github.com/avaya-dux/neo-library-react/blob/main/readmes/how-to-dev.md)

## License

Copyright 2020-2021 Avaya Inc. All Rights Reserved.
