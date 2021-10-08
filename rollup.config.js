import commonjs from "@rollup/plugin-commonjs";
import del from "rollup-plugin-delete";
import sizes from "rollup-plugin-sizes";
import postcss from "rollup-plugin-postcss";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

import pkg from "./package.json";

const isProdBuild = process.env.BUILD === "production";

export default [
  {
    input: "src/index.ts",

    output: [
      { file: pkg.main, format: "cjs", sourcemap: !isProdBuild },
      { file: pkg.module, format: "es", sourcemap: !isProdBuild },
      {
        file: pkg.browser,
        format: "umd",
        sourcemap: !isProdBuild,
        name: "avaya-neo-react",
        // prettier-ignore
        globals: {
          "react/jsx-runtime": "reactJsxRuntime",
          "react": "react",
        },
      },
    ],

    plugins: [
      del({ targets: ["dist/*"] }),
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.build.json" }),
      postcss(),
      // minify all prod builds
      isProdBuild && terser(),
      sizes(),
    ],
  },
];
