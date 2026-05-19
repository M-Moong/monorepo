import { nextJsConfig } from '@repo/eslint-config/next-js';
import { nodeScriptConfig } from '@repo/eslint-config/node-script';

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...nextJsConfig,
  {
    files: ['scripts/**/*.mjs'],
    ...nodeScriptConfig[0],
  },
];
