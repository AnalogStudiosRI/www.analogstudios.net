import js from "@eslint/js";
import globals from "globals";
import noOnlyTests from "eslint-plugin-no-only-tests";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    // https://github.com/eslint/eslint/discussions/18304#discussioncomment-9069706
    ignores: [
      ".greenwood/*",
      "node_modules/*",
      "public/*",
      "reports/*",
      "storybook-static/**",
      "patches/**",
    ],
  },
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
      },
      globals: {
        ...globals.browser,
        ...globals.mocha,
        ...globals.chai,
        ...globals.node,
      },
    },
    plugins: {
      "no-only-tests": noOnlyTests,
    },
  },
  js.configs.recommended,
  tseslint.configs.recommended,
);