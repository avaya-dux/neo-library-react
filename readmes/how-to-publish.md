## how to publish

from the root of the directory

- `yarn clean`
- `yarn build`
- - **TEMP** ([NEO-728](https://jira.forge.avaya.com/browse/NEO-728)): move license files into `dist`
- `npm pack`
- `npm login` (_optional_, but good to ensure that you are properly logged in)
- `npm publish <generated .tgz file> --access public`
- - [link to npmjs page](https://www.npmjs.com/package/@avaya/neo-react)

Further details can be found in [this confluence doc](https://confluence.forge.avaya.com/display/NEO/Guide+to+publishing+new+versions+of+our+React+Component+library+to+npm)
