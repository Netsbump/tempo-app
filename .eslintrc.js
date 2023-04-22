module.exports = {
    parser: "@typescript-eslint/parser",
    extends: [
      "react-app",
      "plugin:@typescript-eslint/recommended",
      "plugin:prettier/recommended",
    ],
    plugins: ["@typescript-eslint", "prettier"],
    rules: {
      "prettier/prettier": "error",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { "argsIgnorePattern": "^_" },
      ],
    },
  };
  