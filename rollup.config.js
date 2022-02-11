const packageJson = require("./package.json");
import dts from "rollup-plugin-dts";

export default [
  {
    input: "./out-tsc/src/index.js",
    output: [
      {
        file: packageJson.module,
        format: "es",
      },
      {
        file: packageJson.main,
        format: "cjs",
        name: "use-media-capabilities",
      },
    ],
    external: [
      'react',
      'react-dom',
    ],
  },
  {
    input: "out-tsc/types/src/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
  },
];
