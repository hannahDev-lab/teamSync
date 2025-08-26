// web(next.js) 기본 eslint 설정
import nextPlugin from '@next/eslint-plugin-next';
import baseConfig from './eslint-preset-base.js';

/** @type {import('eslint').Linter.FlatConfig[]} */
const config = [
  ...baseConfig,
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjs,ts,tsx}'],
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
];

export default config;
