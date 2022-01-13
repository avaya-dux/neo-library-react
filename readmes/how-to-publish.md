## how to publish

from the root of the directory

- `npm login`: to ensure that you are properly logged in to the NPM network
- `yarn all`: this will clean out all build artifacts, rebuild everything, run all tests, and "pack" the tarball if everything was successful
- `yarn publish`: publishes the generated tarball to our registry


You can check that the package was properly published by viewing it on NPMJS
- [link to registry](https://registry.npmjs.org/@avaya%2fneo-react): api call, returns JSON, no cache
- [link to npmjs page](https://www.npmjs.com/package/@avaya/neo-react): our page on NPMJS, is on a 60min cache

If you made a mistake, you can simply `unpublish` the package via
- `npm unpublish @avaya/neo-react@<version>`
- - [see NPMJS docs](https://docs.npmjs.com/cli/v8/commands/npm-unpublish) for further details on unpublishing
