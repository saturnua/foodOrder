module.exports = {
  root: true,
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier', 'jest'],
  parser: 'babel-eslint',
  env: {
    node: true,
    'jest/globals': true,
  },
  settings: {
    'babel-module': {
      root: ['./', './src'],
    },
    'import/resolver': {
      'babel-module': {},
      node: {
        paths: ['node_modules', './src'],
      },
    },
  },
  rules: {
    'prettier/prettier': 'error',
    'no-empty-function': 'warn',
    'func-names': ['warn', 'as-needed'],
    'consistent-return': 'off',
    'import/prefer-default-export': 'off',
    'no-use-before-define': ['error', { functions: false, classes: false }],
    'newline-before-return': 1,
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        pathGroups: [
          {
            pattern: 'contexts',
            group: 'parent',
          },
          {
            pattern: 'config',
            group: 'parent',
          },
        ],

        groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
      },
    ],
    'import/no-extraneous-dependencies': [
      2,
      {
        peerDependencies: ['**/src/**'],
      },
    ],
  },
};
