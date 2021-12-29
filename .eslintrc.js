module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  overrides: [
    {
      files: ["test/**/*.test.ts"],
      env: { "jest/globals": true },
      plugins: ["jest", "jest-formatting"],
      extends: ["plugin:jest/all", "plugin:jest-formatting/recommended"],
    },
  ],
};
