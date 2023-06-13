module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.json"],
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:jest/recommended",
    "plugin:cypress/recommended",
    "plugin:jsx-a11y/recommended",
    "airbnb-base",
    "airbnb-typescript",
    "prettier",
  ],
  plugins: [
    "jest",
    "cypress",
    "react",
    "@typescript-eslint",
    "jsx-a11y",
    "prettier",
  ],
  rules: {
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "*", next: "return" },
      { blankLine: "always", prev: ["const", "let"], next: "*" },
      { blankLine: "any", prev: "const", next: "const" },
      { blankLine: "any", prev: "let", next: "let" },
    ],
  },
};
