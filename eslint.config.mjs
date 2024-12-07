import { defineConfig } from "eslint-define-config";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import reactPlugin from "eslint-plugin-react";
import parser from "@typescript-eslint/parser";

export default defineConfig([
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser,
      globals: {
        browser: true,
        es2021: true,
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin,
      react: reactPlugin,
    },
    settings: {
      react: {
        createClass: "createReactClass",
        pragma: "React",
        fragment: "Fragment",
        version: "detect",
        defaultVersion: "19.0",
      },
    },
    rules: {
      indent: ["error", 2],
      "linebreak-style": ["error", "unix"],
      quotes: ["error", "double"],
      semi: ["error", "always"],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_|React",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
    },
  },
]);
