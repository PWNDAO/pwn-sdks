import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'node:path';
import { fileURLToPath } from 'url';
import js from '@eslint/js';
import baseConfig from '../../eslint.config.mjs';

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
  recommendedConfig: js.configs.recommended,
});

const playwright = await compat.config({ extends: ['plugin:playwright/recommended'] });
const vue = await compat.config({ extends: ['plugin:vue/vue3-recommended'] });

export default [
  {
    ignores: ['**/dist'],
  },
  ...baseConfig,
  ...playwright,
  {
    files: ['**/*.spec.ts', '**/*.test.ts'],
    plugins: {
      vitest: (await import('eslint-plugin-vitest')).default,
    },
    rules: {
      'vitest/expect-expect': 'error',
      'vitest/no-disabled-tests': 'warn',
      'vitest/no-focused-tests': 'error',
      'playwright/no-standalone-expect': 'warn',
    },
  },
  {
    files: ['**/*.vue'],
    ...vue[0],
    languageOptions: {
      parser: await import('vue-eslint-parser'),
      parserOptions: {
        parser: await import('@typescript-eslint/parser'),
        sourceType: 'module',
        ecmaVersion: 'latest',
        extraFileExtensions: ['.vue'],
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-setup-props-destructure': 'off',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: await import('@typescript-eslint/parser'),
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
    },
    plugins: {
      '@typescript-eslint': (await import('@typescript-eslint/eslint-plugin')).default,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
  {
    files: ['**/*.{js,cjs,mjs}'],
    rules: {},
  },
];
