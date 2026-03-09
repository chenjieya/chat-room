// @ts-check
import {
  defineConfigWithVueTs,
  vueTsConfigs
} from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import { globalIgnores } from 'eslint/config'

export default defineConfigWithVueTs(
  {
    files: ['apps/chat-room-web/**/*.{vue,ts,mts,tsx}']
  },
  globalIgnores([
    '**/dist/**',
    '**/dist-ssr/**',
    '**/coverage/**',
    'eslint.config.mjs'
  ]),

  ...pluginVue.configs['flat/essential'],

  vueTsConfigs.recommended,

  {
    languageOptions: {
      globals: {
        ...globals.browser
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        projectServiceOptions: {
          allowDefaultProject: ['eslint.config.mjs']
        }
      }
    }
  }
)
