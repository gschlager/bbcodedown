import typescript from "@rollup/plugin-typescript";

const name = require("./package.json").main.replace(/\.js$/, "");

export default {
  input: "src/index.ts",
  output: [
    {
      file: `${name}.js`,
      format: "cjs",
      exports: "auto",
      sourcemap: true,
    },
    {
      file: `${name}.mjs`,
      format: "es",
      exports: "auto",
      sourcemap: true,
    },
  ],
  plugins: [typescript()],
};
