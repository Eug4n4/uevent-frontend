import js from '@eslint/js'
import stylistic from "@stylistic/eslint-plugin"
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@stylistic': stylistic
    },
    extends: [
      js.configs.recommended,
      tseslint.configs.eslintRecommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
        "@stylistic/quotes": ["error", "double"],
        "@stylistic/indent": ["error", 2],
        "@stylistic/jsx-tag-spacing": ["error", {"beforeSelfClosing": "always"}]
    }
  },
])
