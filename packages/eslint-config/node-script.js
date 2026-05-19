import globals from 'globals';

/**
 * ESLint config for Node.js scripts (*.mjs, *.cjs, *.js in scripts/)
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const nodeScriptConfig = [
  {
    languageOptions: {
      globals: globals.node,
    },
  },
];
