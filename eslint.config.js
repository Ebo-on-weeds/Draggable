import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

import importRulesPlugin from './eslint-rules/import-rules.cjs';
import kebabCasingPlugin from './eslint-rules/kabab-casing.cjs';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  {
    files: ['src/**/*.{ts,tsx,js,jsx}'],
    plugins: {
      'import-rules': importRulesPlugin,
      'kebab-casing': kebabCasingPlugin,
    },
    rules: {
      'import-rules/no-import-from-pages': 'error',
      'kebab-casing/enforce-kebab-casing': 'error',
    },
  },
  {
    files: ['src/pages/**/*.{ts,tsx,js,jsx}'],
    plugins: {
      'import-rules': importRulesPlugin,
    },
    rules: {
      'import-rules/no-cross-feature-imports': 'error',
    },
  },
]);
