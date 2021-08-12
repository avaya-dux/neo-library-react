# neo-library-react

> Made to allow React components to be shareable between multiple projects (such as Location data)

## Install

```bash
yarn add neo-library-react
```

## Example Usage

Additional components available, see storybooks for examples

```tsx
import { ExampleComponent } from "neo-library-react";

export const Example = () => {
  return <ExampleComponent text={"test"} />;
};
```

## devlopment linking

To run a project which consumes this project while it is running in development mode, you need to create a symlink in your consuming project.

Yarn provides a convenient way to do this:

```bash
# from this projects root, register the location of this project for package.json `neo-library-react`
yarn link

# now go to your consuming project directory
cd ~/other-project

# create the symlink to your local development package (note, you MUST use `yarn`, NOT `npm`)
yarn link neo-library-react

# confirm by looking in node_modules to see if the package is symlinked (or by making changes)
cd node_modules/neo-library-react

ls -la
# should show the contents of this repo
```

## to run in 'develop' mode with hot module reloading

This will run in watch mode and produce builds to `dist`.

```
yarn dev
```

## run storybook

```
yarn storybook
```

## testing commands

Run jest tests

```
yarn test
```

Run jest tests and watch for new tests

```
yarn test:watch
```

Run cypress tests

```
yarn test:cypress
```

Open cypress tests in browser

```
yarn test:cypress
```

Run jest tests and display the code coverage results
TODO: need to filter out stories and `index.*` files

```
yarn test:coverage
```

Use VS Code's debugger tool to debug tests or a single test. See "Debug CRA Tests" or "Debug Specific Test" in the debugger dropdown.

[See here for the full description](https://jestjs.io/docs/en/troubleshooting) of how to debug in Chrome and/or VS Code.

## linting

```
yarn lint
```

```
yarn lint --fix
```

## License MIT

need to contact Avaya legal about this
