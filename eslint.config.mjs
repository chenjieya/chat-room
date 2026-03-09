// @ts-check
import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'
import prettier from 'eslint-config-prettier'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    ignores: ['dist', 'node_modules', 'eslint.config.mjs', 'coverage'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest
      }
    }
  },
  {
    files: ['**/*.{ts,mts,cts}'],

    ...tseslint.configs.recommended,

    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    }
  },
  prettier
])
