module.exports = {
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    // extends: 'standard-with-typescript',
  ],
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'prettier',
    '@typescript-eslint',
    // '@typescript-eslint'
  ],
  parser: '@typescript-eslint/parser', // Ensure you have the correct parser
  // overrides: [
  //   {
  //     files: ['*.ts', '*.tsx'], // Your TypeScript files extension
  //     extends: [
  //       'plugin:@typescript-eslint/recommended',
  //       'plugin:@typescript-eslint/recommended-requiring-type-checking',
  //     ],
  //     parserOptions: {
  //       project: ['./tsconfig.json'], // Specify it only for TypeScript files
  //     },
  //   },
  // ],

  rules: {
    'max-len': [2, 100],
    'max-params': [2, 3],
    endOfLine: 0,
    semi: 'off',
    'comma-dangle': [0],
    'max-classes-per-file': 'off',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'no-useless-constructor': 'off',
    'new-cap': 'off',
    'no-useless-return': 'off',
    'no-use-before-define': 'off',
    'lines-between-class-members': 'off',
    'no-underscore-dangle': 'off',
    'no-constructor-return': 'off',
    'implicit-arrow-linebreak': 'off',
    'function-paren-newline': 'off',
    'no-plusplus': 'off',
    camelcase: 'off',
    'func-names': 'off',
    'prefer-arrow-callback': 'off',
    'lines-around-directive': 'off',
    'operator-linebreak': 'off',
    'no-param-reassign': 'off',
    'prefer-promise-reject-errors': 'off',
    'no-alert': 'off',
    'object-curly-newline': 'off',
    'class-methods-use-this': 'off',
    'no-empty-function': 'off',
    'no-this-alias': 'off',
    'no-shadow': [
      'off',
      {
        builtinGlobals: false,
        hoist: 'functions',
        allow: [],
        ignoreOnInitialization: false,
      },
    ],
  },
};
