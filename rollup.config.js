export default {
  input: "./out-tsc/src/index.js",
  output: {
    file: "dist/index.js",
    format: "es",
  },
  external: ["react"],
};
