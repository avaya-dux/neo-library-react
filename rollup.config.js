import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import del from "rollup-plugin-delete";
import sizes from "rollup-plugin-sizes";
import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";

import pkg from "./package.json";

const isProdBuild = process.env.BUILD === "production";

export default [
  {
    input: "src/index.ts",
    external: ["@avaya/neo", "@material-ui/core", "react"],
    output: [
      { file: pkg.main, format: "cjs", sourcemap: !isProdBuild },
      { file: pkg.module, format: "es", sourcemap: !isProdBuild },
    ],
    plugins: [
      // cleanup dist
      isProdBuild && del({ targets: "dist/*" }),

      replace({
        preventAssignment: true,
        "process.env.NODE_ENV": JSON.stringify(
          isProdBuild ? "production" : "development"
        ),
        __buildDate__: () => JSON.stringify(new Date()),
        __buildVersion: pkg.version,
      }),

      resolve({ modulesOnly: true }),
      commonjs(),

      // transpile js files (typescript will not with `allowJs`), eg: optional chaining in js files
      babel({
        babelHelpers: "bundled",
        exclude: ["node_modules/**"],
      }),

      // compile using typescript
      typescript(),

      // minify if prod build
      isProdBuild && terser(),

      // show sizes when generating dist
      sizes(),
    ],
  },
];
