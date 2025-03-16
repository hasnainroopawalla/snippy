import js from "@eslint/js"
import globals from "globals"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import tseslint from "typescript-eslint"

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "no-magic-numbers": ["off"],
      "no-console": ["warn"],
      "no-warning-comments": [
        "warn",
        {
          "terms": ["TODO"],
          "location": "start"
        }
      ],
      "no-alert": ["warn"],
      "no-duplicate-imports": ["error", { "includeExports": true }],
      "no-unused-private-class-members": ["error"],
      "camelcase": ["error"],
      "eqeqeq": ["error"],
      "@typescript-eslint/member-ordering": ["error"],
      "arrow-body-style": ["error", "as-needed"],
      "prefer-const": ["error"],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          "args": "all",
          "argsIgnorePattern": "^_",
          "caughtErrors": "all",
          "caughtErrorsIgnorePattern": "^_",
          "destructuredArrayIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "ignoreRestSiblings": true
        }
      ],
      "lines-between-class-members": [
        "error",
        {
          "enforce": [
            { "blankLine": "always", "prev": "*", "next": "method" },
            { "blankLine": "always", "prev": "method", "next": "*" },
            { "blankLine": "always", "prev": "field", "next": "field" }
          ]
        },
        { "exceptAfterSingleLine": true }
      ],
      "@typescript-eslint/no-non-null-assertion": ["warn"],
      "no-fallthrough": ["error"],
      "object-shorthand": ["error", "always"],
      "@typescript-eslint/naming-convention": [
        "error",
        {
          "selector": "typeLike",
          "format": ["PascalCase"]
        }
      ],

    }
  },
)
