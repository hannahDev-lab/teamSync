import nextPreset from '@teamsync/config/eslint-preset-next.js'

/** @type {import('eslint').Linter.FlatConfig[]} */
const config = [
  ...nextPreset,
  {
    ignores: ['.next/**', 'node_modules/**'],
  },
]

export default config
